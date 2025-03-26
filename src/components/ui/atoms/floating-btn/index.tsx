import { component$, QRLEventHandlerMulti } from '@builder.io/qwik';
import { FaChevronUpSolid } from '@qwikest/icons/font-awesome';
import { cx } from '~/styled-system/css';
import { s } from './styles.css';

export interface FloatingBtnProps {
  class?: string;
  onClick$: QRLEventHandlerMulti<PointerEvent, HTMLButtonElement>;
}

export const FloatingBtn = component$<FloatingBtnProps>((props) => {
  return (
    <button class={cx(s.wrapper, props.class)} onClick$={props.onClick$}>
      <FaChevronUpSolid />
    </button>
  );
});
