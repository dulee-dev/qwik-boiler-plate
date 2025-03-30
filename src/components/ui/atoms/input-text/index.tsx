import { component$, Signal } from '@builder.io/qwik';
import { InputTextType } from '~/libs/html/type';
import { cx } from '~/styled-system/css';
import { inputTextRecipe } from '~/styles/input-text.recipe';

export interface InputTextProps {
  class?: string;
  name: string;
  id: string;
  bindValue: Signal<string>;
  type?: InputTextType;
  placeholder?: string;
  autocomplete?: AutoFill;
}

export const InputText = component$<InputTextProps>((props) => {
  const { class: className, bindValue, ...rest } = props;
  return (
    <input
      class={cx(inputTextRecipe(), className)}
      bind:value={bindValue}
      {...rest}
    />
  );
});
