import { component$ } from '@builder.io/qwik';
import { calcSrcsetBetween } from '~/infra/cloudflare/cf-image-compose.pure';
import { calcSrc } from '~/infra/cloudflare/cf-image-rule.pure';
import { SizesOption } from '~/infra/cloudflare/image.type';
import { calcSizes } from '~/libs/image/image.pure';
import { cx } from '~/styled-system/css';

export interface ResponsiveImageProps {
  class?: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  sizesOption: SizesOption;
  range?: { max?: number; min?: number };
}

export const ResponsiveImage = component$<ResponsiveImageProps>((props) => {
  return (
    <img
      class={cx(props.class)}
      src={calcSrc(props.src, props.width)}
      alt={props.alt}
      width={props.width}
      height={props.height}
      srcset={calcSrcsetBetween(props.src, props.range)}
      sizes={calcSizes(props.sizesOption)}
    />
  );
});
