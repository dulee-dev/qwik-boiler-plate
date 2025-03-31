import { component$, Signal } from '@builder.io/qwik';
import { s } from './styles.css';
import { InputText } from '../../atoms/input-text';
import { pwPlaceholder } from '~/libs/html/constant';
import { cx } from '~/styled-system/css';
import { InputInfo } from '../../atoms/input-info';
import { InputInfoType } from '~/libs/html/type';

export interface InputPasswordProps {
  class?: string;
  label: string;

  pw: Signal<string>;
  pwConfirm: Signal<string>;
  infoMatch?: InputInfoType;
  infoValid?: InputInfoType;
  infoLength?: InputInfoType;
}

export const InputPassword = component$<InputPasswordProps>((props) => {
  const {
    class: className,
    label,
    pw,
    pwConfirm,
    infoMatch,
    infoValid,
    infoLength,
  } = props;
  return (
    <div class={className}>
      <div>
        <label class={s.label} for={'pw'}>
          {label}
        </label>
      </div>
      <InputText
        class={cx(s.input, s.pw)}
        id={'pw'}
        name="pw"
        placeholder={pwPlaceholder}
        bindValue={pw}
        type="password"
        autocomplete="new-password"
      />
      <InputText
        aria-label="pwConfirm"
        class={s.input}
        id={'pwConfirm'}
        name="pwConfirm"
        placeholder={pwPlaceholder}
        bindValue={pwConfirm}
        type="password"
        autocomplete="new-password"
      />
      <InputInfo class={s.info} info={infoValid} />
      <InputInfo class={s.info} info={infoLength} />
      <InputInfo class={s.info} info={infoMatch} />
    </div>
  );
});
