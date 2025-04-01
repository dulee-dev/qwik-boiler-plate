import { $, component$, useSignal } from '@builder.io/qwik';
import { Form } from '@builder.io/qwik-city';
import { cx } from '~/styled-system/css';
import { InputTextVerbose } from '../../molecules/input-text-verbose';
import { inlineTranslate } from 'qwik-speak';
import { s } from './styles.css';
import { InputPassword } from '../../molecules/input-password';
import { useInputText } from '~/hooks/use-input-text';
import { usePwMatchInfo } from './hooks/use-pw-match-info.hook';
import { usePwLengthInfo } from './hooks/use-pw-lenght-info.hook';
import { usePwValidInfo } from './hooks/use-pw-valid-info.hook';
import { useSubmitStatus } from './hooks/use-submit-status.hook';
import { Submit } from '../../atoms/submit';
import { signIn } from '~/server/auth/auth.effect';
import { useSignUpAction, useSignUpCode } from '~/routes/users/sign-up/profile';
import { InputCheckbox } from '../../molecules/input-checkbox';

export interface UserSignUpFormProps {
  class?: string;
}

export const UserSignUpProfileForm = component$<UserSignUpFormProps>(
  (props) => {
    const t = inlineTranslate();
    const emailInCode = useSignUpCode();
    const action = useSignUpAction();

    const email = useInputText(emailInCode.value.data || '');
    const pw = useInputText('');
    const pwConfirm = useInputText('');
    const marketing = useSignal(false);

    const pwInfo = usePwMatchInfo(pw, pwConfirm);
    const pwLengthInfo = usePwLengthInfo(pw);
    const pwValidInfo = usePwValidInfo(pw);
    const {
      submitStatus,
      onSubmit$: onSubmitStatus$,
      onSubmitCompleted$: onStatusSubmitCompleted$,
    } = useSubmitStatus(pwInfo);

    const onSubmit$ = $(async () => {
      await onSubmitStatus$();
      await action.submit({
        email: email.value,
        pw: pw.value,
        marketing: marketing.value,
      });

      await onStatusSubmitCompleted$();
      await signIn({ email: email.value, pw: pw.value });

      window.location.href = '/console?msg=welcome';
    });

    return (
      <div class={cx(s.wrapper, props.class)}>
        <h1 class={s.title}>{t('usersSignUpProfile.form.title')}</h1>
        <Form class={cx(props.class)} onSubmit$={onSubmit$}>
          <InputTextVerbose
            label="email"
            name="email"
            id="email"
            info={{ type: 'ok', tag: 'dynamic.info.ok.base' }}
            type={'email'}
            placeholder="dulee@duleelab.com"
            bindValue={email}
            disabled
          />
          <InputPassword
            label="password"
            pw={pw}
            pwConfirm={pwConfirm}
            infoMatch={pwInfo.value}
            infoLength={pwLengthInfo.value}
            infoValid={pwValidInfo.value}
          />
          <div class={s.approval}>
            <InputCheckbox
              label={t('usersSignUpProfile.form.marketing')}
              name="marketing"
              id="marketing"
              bindChecked={marketing}
            />
          </div>
          <Submit
            class={s.submit}
            status={submitStatus.value}
            label={t('usersSignUpProfile.form.submit')}
          />
        </Form>
      </div>
    );
  }
);
