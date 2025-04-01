import { component$, Signal } from '@builder.io/qwik';
import { cx } from '~/styled-system/css';
import { s } from './styles.css';

export interface InputCheckboxProps {
  class?: string;
  label: string;
  name: string;
  id: string;
  bindChecked: Signal<boolean>;
}

export const InputCheckbox = component$<InputCheckboxProps>((props) => {
  const { class: className, label, name, id, bindChecked } = props;
  return (
    <div class={cx(s.wrapper, className)}>
      <input
        class={s.input}
        type="checkbox"
        bind:checked={bindChecked}
        name={name}
        value="marketing"
        id={id}
      />
      <label for={id}>{label}</label>
    </div>
  );
});
