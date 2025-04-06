import { $, component$, Signal } from '@builder.io/qwik';
import { cx } from '~/styled-system/css';
import { s } from './styles.css';

export interface InputRadioOthersProps {
  class?: string;
  label: string;
  radioName: string;
  textName: string;
  textLabel: string;
  id: string;
  value: string;
  bindRadio: Signal<string | undefined>;
  bindText: Signal<string>;
}

export const InputRadioOthers = component$<InputRadioOthersProps>((props) => {
  const {
    class: className,
    label,
    radioName,
    id,
    value,
    bindRadio,
    bindText,
    textLabel,
    textName,
  } = props;

  const onInput$ = $(() => {
    bindRadio.value = value;
  });

  return (
    <div class={cx(s.wrapper, className)}>
      <div class={s.inputBox}>
        <input
          class={s.radio}
          type="radio"
          value={value}
          name={radioName}
          id={id}
          onInput$={onInput$}
          checked={value === bindRadio.value}
        />
        <label for={id}>{label}</label>
      </div>
      <input
        class={s.text}
        type="text"
        bind:value={bindText}
        name={textName}
        aria-label={textLabel}
      />
    </div>
  );
});
