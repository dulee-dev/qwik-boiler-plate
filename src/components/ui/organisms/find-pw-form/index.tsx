import { $, component$, useContext, useSignal } from '@builder.io/qwik';
import { Form, useNavigate } from '@builder.io/qwik-city';
import { cx } from '~/styled-system/css';
import { InputTextVerbose } from '../../molecules/input-text-verbose';
import { inlineTranslate } from 'qwik-speak';
import { s } from './styles.css';
import { useEmailInfo } from './hooks/use-email-info';
import { useSubmitStatus } from './hooks/use-submit-status.hook';
import { Submit } from '../../atoms/submit';
import { useFindPwAction } from '~/routes/users/find-pw';
import { ToastListContext } from '~/contexts/toast-list';

export interface FindPwFormProps {
  class?: string;
}

export const FindPwForm = component$<FindPwFormProps>((props) => {
  const t = inlineTranslate();
  const toastList = useContext(ToastListContext);
  const action = useFindPwAction();

  const email = useSignal('');
  const emailInfo = useEmailInfo(email);

  const {
    status,
    onSubmit$,
    onSubmitCompleted$: onSubmitCompletedStatus$,
  } = useSubmitStatus(emailInfo);

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
        tag: 'dynamic.findPw.fail',
      });
      return;
    }

    window.location.href = `/users/find-pw/success/?email=${email.value}/`;
  });

  return (
    <div class={cx(s.wrapper, props.class)}>
      <h1 class={s.title}>{t('usersFindPw.form.title')}</h1>
      <div class={s.desc}>{t('usersFindPw.form.desc')}</div>
      <Form
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
        <Submit
          label={t('usersFindPw.form.submit')}
          status={status.value}
          class={s.submit}
        />
      </Form>
    </div>
  );
});
