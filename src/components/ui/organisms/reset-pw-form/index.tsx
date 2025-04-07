import { $, component$, useContext } from '@builder.io/qwik';
import { Form } from '@builder.io/qwik-city';
import { cx } from '~/styled-system/css';
import { inlineTranslate } from 'qwik-speak';
import { s } from './styles.css';
import { InputPassword } from '../../molecules/input-password';
import { useInputText } from '~/hooks/use-input-text';
import { usePwMatchInfo } from './hooks/use-pw-match-info.hook';
import { usePwLengthInfo } from './hooks/use-pw-lenght-info.hook';
import { usePwValidInfo } from './hooks/use-pw-valid-info.hook';
import { Submit } from '../../atoms/submit';
import { useSubmitStatus } from './hooks/use-submit-status.hook';
import { useResetPwAction } from '~/routes/users/reset-pw';
import { ToastListContext } from '~/contexts/toast-list';

export interface ResetPwFormProps {
  class?: string;
}

export const ResetPwForm = component$<ResetPwFormProps>((props) => {
  const t = inlineTranslate();
  const toastList = useContext(ToastListContext);

  const pw = useInputText('');
  const pwConfirm = useInputText('');
  const pwInfo = usePwMatchInfo(pw, pwConfirm);
  const pwLengthInfo = usePwLengthInfo(pw);
  const pwValidInfo = usePwValidInfo(pw);

  const action = useResetPwAction();

  const {
    submitStatus,
    onSubmit$,
    onSubmitCompleted$: onSubmitCompletedStatus$,
  } = useSubmitStatus(pwInfo);

  const onSubmitCompleted$ = $(() => {
    onSubmitCompletedStatus$();
    const result = action.value;

    if (result === undefined) {
      toastList.addToast$({
        type: 'error',
        tag: 'dynamic.error.server',
      });
      return;
    }

    if (result.success === false) {
      toastList.addToast$({
        type: 'error',
        tag: 'dynamic.resetPw.fail',
      });
      return;
    }

    window.location.href = '/users/sign-in/?msg=reset-pw';
  });

  return (
    <div class={cx(s.wrapper, props.class)}>
      <h1 class={s.title}>{t('usersResetPw.form.title')}</h1>
      <div class={s.desc}>{t('usersResetPw.form.desc')}</div>
      <Form
        action={action}
        onSubmit$={onSubmit$}
        onSubmitCompleted$={onSubmitCompleted$}
      >
        <InputPassword
          label="new password"
          pw={pw}
          pwConfirm={pwConfirm}
          infoMatch={pwInfo.value}
          infoLength={pwLengthInfo.value}
          infoValid={pwValidInfo.value}
        />

        <Submit
          status={submitStatus.value}
          label={t('usersResetPw.form.submit')}
        />
      </Form>
    </div>
  );
});
