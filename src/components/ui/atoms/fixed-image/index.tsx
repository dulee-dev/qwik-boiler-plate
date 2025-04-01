import { component$ } from '@builder.io/qwik';
import { calcSrc } from '~/infra/cloudflare/cf-image-rule.pure';
import { cx } from '~/styled-system/css';

export interface FixedImageProps {
  class?: string;
  src: string;
  alt: string;
  width: number;
  height: number;
}

export const FixedImage = component$<FixedImageProps>((props) => {
  return (
    <img
      class={cx(props.class)}
      src={calcSrc(props.src, props.width)}
      alt={props.alt}
      width={props.width}
      height={props.height}
    />
  );
});
