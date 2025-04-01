import { component$, QRL, Signal, useComputed$ } from '@builder.io/qwik';
import { calcSrcsetBetween } from '~/infra/cloudflare/cf-image-compose.pure';
import { calcSrc, checkIsCFImage } from '~/infra/cloudflare/cf-image-rule.pure';
import { SizesOption } from '~/infra/cloudflare/image.type';
import { calcSizes } from '~/libs/image/image.pure';
import { cx } from '~/styled-system/css';
import { s } from './styles.css';

export interface InputImageProps {
  class?: string;
  ref: Signal<HTMLInputElement | undefined>;
  src?: string | null;
  placeholder?: string;
  sizesOption: SizesOption;
  range?: { max?: number; min?: number };
  alt: string;
  height: number;
  width: number;
  id: string;
  name: string;
  onChange$: QRL<() => any>;
}

export const InputImage = component$<InputImageProps>((props) => {
  const {
    ref,
    src,
    placeholder,
    sizesOption,
    range,
    alt,
    height,
    width,
    id,
    name,
    onChange$,
  } = props;

  const useSrc = useComputed$(() => {
    if (src) {
      if (checkIsCFImage(src)) return calcSrc(src, range?.max);
      return src;
    }
    if (placeholder) {
      return calcSrc(placeholder, range?.max);
    }
  });

  const useSrcset = useComputed$(() => {
    return src && checkIsCFImage(src)
      ? calcSrcsetBetween(src, range)
      : undefined;
  });

  return (
    <label class={cx(s.label, props.class)} for={id}>
      <img
        class={s.img}
        src={useSrc.value}
        sizes={calcSizes(sizesOption)}
        alt={alt}
        width={width}
        height={height}
        srcset={useSrcset.value}
      />
      <input
        class={s.input}
        name={name}
        id={id}
        ref={ref}
        onChange$={onChange$}
        type="file"
        accept="image/*"
      />
    </label>
  );
});
