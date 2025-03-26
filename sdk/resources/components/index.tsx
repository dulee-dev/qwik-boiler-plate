import { component$ } from '@builder.io/qwik';
import { cx } from '~/styled-system/css';

export interface __Name__Props {
  class?: string;
}

export const __Name__ = component$<__Name__Props>((props) => {
  return <div class={cx(props.class)}>__Name__</div>;
});
