import { $, component$, Signal } from '@builder.io/qwik';
import { cx } from '~/styled-system/css';
import { s } from './styles.css';

export interface InputRadioProps {
  class?: string;
  label: string;
  name: string;
  id: string;
  value: string;
  bindValue: Signal<string | undefined>;
}

export const InputRadio = component$<InputRadioProps>((props) => {
  const { class: className, label, name, id, value, bindValue } = props;

  const onInput$ = $(() => {
    bindValue.value = value;
  });

  return (
    <div class={cx(s.wrapper, className)}>
      <input
        class={s.input}
        type="radio"
        value={value}
        name={name}
        id={id}
        onInput$={onInput$}
        checked={value === bindValue.value}
      />
      <label for={id}>{label}</label>
    </div>
  );
});
