import { component$, Signal } from '@builder.io/qwik';
import { s } from './styles.css';
import { InputText } from '../../atoms/input-text';
import { InputTextType } from '~/libs/html/type';
import { InputInfo } from '../../atoms/input-info';

export interface InputTextVerboseProps {
  class?: string;
  label: string;
  name: string;
  id: string;
  bindValue: Signal<string>;
  info?: {
    type: 'ok' | 'error' | 'desc';
    text: string;
  };
  type?: InputTextType;
  placeholder?: string;
}

export const InputTextVerbose = component$<InputTextVerboseProps>((props) => {
  const { class: className, info, label, id, ...inputProps } = props;
  return (
    <div class={className}>
      <div>
        <label class={s.label} for={id}>
          {label}
        </label>
      </div>
      <InputText class={s.input} id={id} {...inputProps} />
      <InputInfo info={info} />
    </div>
  );
});
