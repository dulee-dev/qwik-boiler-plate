import { component$, Signal } from '@builder.io/qwik';
import { cx } from '~/styled-system/css';
import { s } from './styles.css';

export interface InputCheckboxProps {
  class?: string;
  label: string;
  name: string;
  id: string;
  value: string;
  bindChecked: Signal<boolean>;
}

export const InputCheckbox = component$<InputCheckboxProps>((props) => {
  const { class: className, label, name, id, bindChecked, value } = props;
  return (
    <div class={cx(s.wrapper, className)}>
      <input
        class={s.input}
        type="checkbox"
        bind:checked={bindChecked}
        value={value}
        name={name}
        id={id}
      />
      <label for={id}>{label}</label>
    </div>
  );
});
