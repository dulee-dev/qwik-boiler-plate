import { component$, useSignal } from '@builder.io/qwik';
import { cx } from '~/styled-system/css';
import { Header } from '../../organisms/header';
import { Footer } from '../../organisms/footer';
import { s } from './styles.css';
import { FixedImage } from '../../atoms/fixed-image';
import { cfImageUrlFixtures } from '@shared/fixtures/cf-image-src.fixture';
import { ResponsiveImage } from '../../atoms/responsive-image';

export interface ConsoleImageProps {
  class?: string;
}

export const ConsoleImage = component$<ConsoleImageProps>((props) => {
  return (
    <div class={cx(props.class)}>
      <Header size="wide" />
      <div class={s.box}>Img</div>
      <FixedImage
        src={cfImageUrlFixtures[0]}
        width={600}
        height={600}
        alt="alt"
      />

      <ResponsiveImage
        src={cfImageUrlFixtures[0]}
        width={600}
        height={600}
        sizesOption={{
          base: {
            unit: 'vw',
            value: 100,
          },
        }}
        range={{ min: 330, max: 600 }}
        alt="alt"
      />

      <Footer size="wide" />
    </div>
  );
});
