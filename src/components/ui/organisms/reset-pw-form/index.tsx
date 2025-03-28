import { component$ } from '@builder.io/qwik';
import { Form } from '@builder.io/qwik-city';
import { cx } from '~/styled-system/css';
import { InputTextVerbose } from '../../molecules/input-text-verbose';
import { inlineTranslate } from 'qwik-speak';
import { s } from './styles.css';
import { buttonRecipe } from '~/styles/button.recipe';
import { InputPassword } from '../../molecules/input-password';

export interface ResetPwFormProps {
  class?: string;
}

export const ResetPwForm = component$<ResetPwFormProps>((props) => {
  const t = inlineTranslate();

  return (
    <div class={cx(s.wrapper, props.class)}>
      <h1 class={s.title}>{t('users-reset-pw.form.title@@비밀번호 초기화')}</h1>
      <div class={s.desc}>
        {t('users-reset-pw.form.desc@@사용하실 비밀번호를 입력해주세요')}
      </div>
      <Form>
        <InputPassword
          label="new password"
          pw=""
          pwConfirm=""
          info={{
            type: 'error',
            text: 'error',
          }}
        />

        <button class={cx(buttonRecipe({ priority: 'primary' }), s.submit)}>
          {t('users-reset-pw.form.submit@@비밀번호 초기화')}
        </button>
      </Form>
    </div>
  );
});
