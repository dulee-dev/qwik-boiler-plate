import { $, component$ } from '@builder.io/qwik';
import { Form, useNavigate } from '@builder.io/qwik-city';
import { cx } from '~/styled-system/css';
import { InputTextVerbose } from '../../molecules/input-text-verbose';
import { inlineTranslate } from 'qwik-speak';
import { s } from './styles.css';
import { InputPassword } from '../../molecules/input-password';
import { useInputText } from '~/hooks/use-input-text';
import { useEmailInfo } from './hooks/use-email-info.hook';
import { usePwMatchInfo } from './hooks/use-pw-match-info.hook';
import { usePwLengthInfo } from './hooks/use-pw-lenght-info.hook';
import { usePwValidInfo } from './hooks/use-pw-valid-info.hook';
import { useSubmitStatus } from './hooks/use-submit-status.hook';
import { useSignUpAction } from '~/routes/users/sign-up';
import { Submit } from '../../atoms/submit';
import { signIn } from '~/server/auth/auth.effect';

export interface UserSignUpFormProps {
  class?: string;
}

export const UserSignUpForm = component$<UserSignUpFormProps>((props) => {
  const t = inlineTranslate();
  const nav = useNavigate();

  const email = useInputText('');
  const pw = useInputText('');
  const pwConfirm = useInputText('');
  const action = useSignUpAction();

  const emailInfo = useEmailInfo(email);
  const pwInfo = usePwMatchInfo(pw, pwConfirm);
  const pwLengthInfo = usePwLengthInfo(pw);
  const pwValidInfo = usePwValidInfo(pw);
  const {
    submitStatus,
    onSubmit$,
    onSubmitCompleted$: onStatusSubmitCompleted$,
  } = useSubmitStatus(emailInfo, pwInfo);

  const onSubmitCompleted$ = $(async () => {
    await onStatusSubmitCompleted$();
    await signIn({ email: email.value, pw: pw.value });

    nav('/console?msg=welcome');
  });

  return (
    <div class={cx(s.wrapper, props.class)}>
      <h1 class={s.title}>{t('usersSignUp.form.title')}</h1>
      <Form
        class={cx(props.class)}
        action={action}
        onSubmit$={onSubmit$}
        onSubmitCompleted$={onSubmitCompleted$}
      >
        <InputTextVerbose
          label="email"
          name="email"
          id="email"
          info={emailInfo.value}
          type={'email'}
          placeholder="dulee@duleelab.com"
          bindValue={email}
        />
        <InputPassword
          label="password"
          pw={pw}
          pwConfirm={pwConfirm}
          infoMatch={pwInfo.value}
          infoLength={pwLengthInfo.value}
          infoValid={pwValidInfo.value}
        />
        <Submit
          status={submitStatus.value}
          // status={'loading'}
          label={t('usersSignUp.form.submit')}
        />
      </Form>
    </div>
  );
});
