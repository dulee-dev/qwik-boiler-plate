import { $, component$, useContext } from '@builder.io/qwik';
import { Form } from '@builder.io/qwik-city';
import { cx } from '~/styled-system/css';
import { InputTextVerbose } from '../../molecules/input-text-verbose';
import { inlineTranslate } from 'qwik-speak';
import { s } from './styles.css';
import { useInputText } from '~/hooks/use-input-text';
import { useEmailInfo } from './hooks/use-email-info.hook';
import { useSubmitStatus } from './hooks/use-submit-status.hook';
import { useCreateSignUpCodeAction } from '~/routes/users/sign-up';
import { Submit } from '../../atoms/submit';
import { ToastListContext } from '~/contexts/toast-list';

export interface UserSignUpFormProps {
  class?: string;
}

export const UserSignUpForm = component$<UserSignUpFormProps>((props) => {
  const t = inlineTranslate();
  const toastList = useContext(ToastListContext);
  const action = useCreateSignUpCodeAction();

  const email = useInputText('');

  const emailInfo = useEmailInfo(email);

  const {
    submitStatus,
    onSubmit$,
    onSubmitCompleted$: onStatusSubmitCompleted$,
  } = useSubmitStatus(emailInfo);

  const onSubmitCompleted$ = $(async () => {
    await onStatusSubmitCompleted$();
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

    window.location.href = `/users/sign-up/check-email/?email=${email.value}/`;
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
        <Submit
          status={submitStatus.value}
          label={t('usersSignUp.form.submit')}
        />
      </Form>
    </div>
  );
});
