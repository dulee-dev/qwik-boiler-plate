import { component$ } from '@builder.io/qwik';
import { s } from './styles.css';
import { InputText } from '../../atoms/input-text';
import { InputTextType } from '~/libs/html/type';

export interface InputTextLabeledProps {
  class?: string;
  label: string;
  name: string;
  id: string;
  value: string;
  type?: InputTextType;
  placeholder?: string;
}

export const InputTextLabeled = component$<InputTextLabeledProps>((props) => {
  const { class: className, label, id, ...inputProps } = props;
  return (
    <div class={className}>
      <div>
        <label class={s.label} for={id}>
          {label}
        </label>
      </div>
      <InputText class={s.input} id={id} {...inputProps} />
    </div>
  );
});
