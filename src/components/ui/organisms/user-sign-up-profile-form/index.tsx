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
import { useCompanySize } from '~/server/loader/use-company-size.loader';
import { useUserInfoRole } from '~/server/loader/use-user-info-role.loader';
import { useUserInfoGoal } from '~/server/loader/use-user-info-goal.loader';
import { InputRadio } from '../../molecules/input-radio';
import { projectCompanySizeLabel } from '~/domains/company-size/company-size.pure';

export interface UserSignUpFormProps {
  class?: string;
}

export const UserSignUpProfileForm = component$<UserSignUpFormProps>(
  (props) => {
    const t = inlineTranslate();
    const emailInCode = useSignUpCode();
    const action = useSignUpAction();
    const companySizeLoaded = useCompanySize();
    const userInfoRoleLoaded = useUserInfoRole();
    const userInfoGoalLoaded = useUserInfoGoal();

    const email = useInputText(emailInCode.value.data || '');
    const pw = useInputText('');
    const pwConfirm = useInputText('');
    const companyName = useInputText('');
    const companyUrl = useInputText('');
    const companySize = useSignal<string | undefined>(undefined);
    const userInfoRole = useSignal<string | undefined>(undefined);
    const userInfoGoal = useSignal<string | undefined>(undefined);

    const marketingApproval = useSignal(false);

    const pwInfo = usePwMatchInfo(pw, pwConfirm);
    const pwLengthInfo = usePwLengthInfo(pw);
    const pwValidInfo = usePwValidInfo(pw);
    const {
      submitStatus,
      onSubmit$: onSubmitStatus$,
      onSubmitCompleted$: onStatusSubmitCompleted$,
    } = useSubmitStatus(
      pwInfo,
      companyName,
      companyUrl,
      companySize,
      userInfoRole,
      userInfoGoal
    );

    const onSubmit$ = $(async () => {
      const companySizeId = companySizeLoaded.value.find(
        (c) => c.tag === companySize.value
      )?.id;
      const roleId = userInfoRoleLoaded.value.find(
        (c) => c.tag === userInfoRole.value
      )?.id;
      const goalId = userInfoGoalLoaded.value.find(
        (c) => c.tag === userInfoGoal.value
      )?.id;

      await onSubmitStatus$();
      await action.submit({
        email: email.value,
        pw: pw.value,
        marketingApproval: marketingApproval.value,
        companyName: companyName.value,
        companyUrl: companyUrl.value,
        companySizeId,
        roleId,
        goalId,
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
          <div class={s.info}>
            <InputTextVerbose
              label="company name"
              name="companyName"
              id="companyName"
              info={undefined}
              bindValue={companyName}
              minLength={1}
              maxLength={128}
            />
            <InputTextVerbose
              label="company url"
              name="companyUrl"
              id="companyUrl"
              info={undefined}
              bindValue={companyUrl}
              minLength={1}
              maxLength={128}
            />

            <div class={s.radios}>
              <div class={s.label}>company size</div>
              <div>
                {companySizeLoaded.value.map((c) => (
                  <InputRadio
                    class={s.radio}
                    key={c.id}
                    id={`companySize-${c.id}`}
                    name="companySize"
                    value={c.tag}
                    label={projectCompanySizeLabel(c.tag)}
                    bindValue={companySize}
                  />
                ))}
              </div>
            </div>

            <div class={s.radios}>
              <div class={s.label}>role</div>
              <div>
                {userInfoRoleLoaded.value.map((c) => (
                  <InputRadio
                    class={s.radio}
                    key={c.id}
                    id={`userInfoRole-${c.id}`}
                    name="userInfoRole"
                    value={c.tag}
                    label={t(`dynamic.userInfoRole.${c.tag}`)}
                    bindValue={userInfoRole}
                  />
                ))}
              </div>
            </div>

            <div class={s.radios}>
              <div class={s.label}>goal</div>
              <div>
                {userInfoGoalLoaded.value.map((c) => (
                  <InputRadio
                    class={s.radio}
                    key={c.id}
                    id={`userInfoGoal-${c.id}`}
                    name="userInfoGoal"
                    value={c.tag}
                    label={t(`dynamic.userInfoGoal.${c.tag}`)}
                    bindValue={userInfoGoal}
                  />
                ))}
              </div>
            </div>
          </div>

          <div class={s.approval}>
            <InputCheckbox
              label={t('usersSignUpProfile.form.marketing')}
              name="marketing"
              id="marketing"
              value="marketing"
              bindChecked={marketingApproval}
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
