import { $, component$, useContext, useSignal } from '@builder.io/qwik';
import { Form } from '@builder.io/qwik-city';
import { cx } from '~/styled-system/css';
import { InputTextVerbose } from '../../molecules/input-text-verbose';
import { InputTextLabeled } from '../../molecules/input-text-labeled';
import { inlineTranslate } from 'qwik-speak';
import { s } from './styles.css';
import { middleDot } from '~/utils/string';
import { useEmailInfo } from './hooks/use-email-info';
import { useSignInAction } from '~/routes/users/sign-in';
import { ToastListContext } from '~/contexts/toast-list';
import { Submit } from '../../atoms/submit';
import { useSubmitStatus } from './hooks/use-submit-status.hook';
import { GoogleOauth } from '../../molecules/google-oauth';

export interface UserSignInFormProps {
  class?: string;
}

export const UserSignInForm = component$<UserSignInFormProps>((props) => {
  const t = inlineTranslate();
  const toastList = useContext(ToastListContext);

  const email = useSignal('');
  const pw = useSignal('');

  const emailInfo = useEmailInfo(email);
  const {
    status,
    onSubmit$,
    onSubmitCompleted$: onSubmitCompletedStatus$,
  } = useSubmitStatus(emailInfo, pw);

  const action = useSignInAction();

  const onSubmitCompleted$ = $(() => {
    onSubmitCompletedStatus$();
    const result = action.value;

    if (result === undefined) {
      toastList.addToast$({
        type: 'error',
        tag: 'dynamic.info.error.server',
      });
      return;
    }

    if (result.success === false) {
      toastList.addToast$({
        type: 'error',
        tag: 'dynamic.signIn.fail',
      });
      return;
    }

    window.location.href = '/console/?msg=welcome';
  });

  return (
    <div class={cx(s.wrapper, props.class)}>
      <h1 class={s.title}>{t('usersSignIn.form.title')}</h1>
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
          bindValue={email}
          info={emailInfo.value}
          type={'email'}
          placeholder="dulee@duleelab.com"
        />
        <InputTextLabeled
          label="password"
          name="password"
          id="password"
          bindValue={pw}
          type={'password'}
          placeholder="********"
        />
        <Submit
          class={s.submit}
          label={t('usersSignIn.form.submit')}
          status={status.value}
        />
      </Form>
      <GoogleOauth />
      <div class={s.links}>
        <a class={s.link} href="/users/sign-up">
          {t('usersSignIn.links.signUp')}
        </a>
        <span class={s.middleDot}>{middleDot}</span>
        <a class={s.link} href="/users/find-pw">
          {t('usersSignIn.links.findPw')}
        </a>
      </div>
    </div>
  );
});
