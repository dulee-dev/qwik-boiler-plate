import { component$, QRLEventHandlerMulti } from '@builder.io/qwik';
import { s } from './styles.css';

export interface ButtonProps {
  text: string;
  onClick$: QRLEventHandlerMulti<PointerEvent, HTMLButtonElement>;
}

export const Button = component$<ButtonProps>((props) => {
  return (
    <button class={s.button} onClick$={props.onClick$}>
      {props.text}
    </button>
  );
});
