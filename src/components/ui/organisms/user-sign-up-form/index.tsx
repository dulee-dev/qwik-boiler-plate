import { component$ } from '@builder.io/qwik';
import { Form } from '@builder.io/qwik-city';
import { cx } from '~/styled-system/css';
import { InputTextVerbose } from '../../molecules/input-text-verbose';
import { inlineTranslate } from 'qwik-speak';
import { s } from './styles.css';
import { buttonRecipe } from '~/styles/button.recipe';
import { InputPassword } from '../../molecules/input-password';
import { useInputText } from '~/hooks/use-input-text';
import { useEmailInfo } from './hooks/use-email-info.hook';

export interface UserSignUpFormProps {
  class?: string;
}

export const UserSignUpForm = component$<UserSignUpFormProps>((props) => {
  const t = inlineTranslate();

  const email = useInputText('');
  const pw = useInputText('');
  const pwConfirm = useInputText('');

  const emailInfo = useEmailInfo();

  return (
    <div class={cx(s.wrapper, props.class)}>
      <h1 class={s.title}>{t('users-sign-up.form.title@@회원가입')}</h1>
      <Form class={cx(props.class)}>
        {email.value}
        <InputTextVerbose
          label="email"
          name="email"
          id="email"
          info={{
            type: 'ok',
            text: 'ok',
          }}
          type={'email'}
          placeholder="dulee@duleelab.com"
          bindValue={email}
        />
        <InputPassword
          label="password"
          pw={pw}
          pwConfirm={pwConfirm}
          info={{
            type: 'error',
            text: 'error',
          }}
        />

        <button class={cx(buttonRecipe({ priority: 'primary' }), s.submit)}>
          {t('users-sign-up.form.submit@@가입하기')}
        </button>
      </Form>
    </div>
  );
});
