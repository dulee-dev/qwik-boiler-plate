import { component$, useSignal } from '@builder.io/qwik';
import { cx } from '~/styled-system/css';
import { Header } from '../../organisms/header';
import { Footer } from '../../organisms/footer';
import { useInputImg } from '~/hooks/use-input-image';
import { s } from './styles.css';
import { InputImage } from '../../molecules/input-image';
import { cfImageUrlFixtures } from '@shared/fixtures/cf-image-src.fixture';

export interface ConsoleUploadImageProps {
  class?: string;
}

export const ConsoleUploadImage = component$<ConsoleUploadImageProps>(
  (props) => {
    const ref = useSignal<HTMLInputElement>();
    const { src, idle, onChange$ } = useInputImg(ref);
    return (
      <div class={cx(props.class)}>
        <Header size="wide" />
        <div class={s.box}>
          <InputImage
            ref={ref}
            src={src.value}
            placeholder={cfImageUrlFixtures[0]}
            sizesOption={{
              base: {
                unit: 'vw',
                value: 100,
              },
            }}
            range={{
              max: 3400,
              min: 600,
            }}
            alt={'alt'}
            height={400}
            width={600}
            onChange$={onChange$}
            id={'img'}
            name={'img'}
          />
          <div>idle: {idle.value ? 'Y' : 'N'}</div>
        </div>

        <Footer size="wide" />
      </div>
    );
  }
);
