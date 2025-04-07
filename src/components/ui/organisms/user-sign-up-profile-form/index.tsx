import {
  $,
  component$,
  useComputed$,
  useContext,
  useSignal,
} from '@builder.io/qwik';
import { Form, server$, useLocation } from '@builder.io/qwik-city';
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
import { googleAuth, signIn } from '~/server/auth/auth.effect';
import { useSignUpEmail } from '~/routes/users/sign-up/profile';
import { InputCheckbox } from '../../molecules/input-checkbox';
import { useCompanySize } from '~/server/loader/use-company-size.loader';
import { useUserInfoRole } from '~/server/loader/use-user-info-role.loader';
import { useUserInfoGoal } from '~/server/loader/use-user-info-goal.loader';
import { InputRadio } from '../../molecules/input-radio';
import { projectCompanySizeLabel } from '~/domains/company-size/company-size.pure';
import { InputRadioOthers } from '../../molecules/input-radio-others';
import { userInfoRoleMain } from '~/infra/main/services/user-info-role/user-info-role-main.effect';
import { ToastListContext } from '~/contexts/toast-list';
import { userInfoGoalMain } from '~/infra/main/services/user-info-goal/user-info-goal-main.effect';
import { trimTailSlash } from '~/libs/url/rule';
import { UserInfoProto } from '@shared/domains/user-info/user-info.type';
import { userMain } from '~/infra/main/services/user/user-main.effect';
import { serverErrorToast } from '~/libs/error/error';
import { googleOAuthMain } from '~/infra/main/services/google/oauth-main.effect';

const signUpWithPw = server$(async function (
  data: { email: string; pw: string; signUpCodeId: string } & Omit<
    UserInfoProto,
    'userId'
  >
) {
  try {
    const response = await userMain.signUp(data);
    if (response.body.code === 201000) {
      return { success: true };
    }
    return { success: false };
  } catch (err) {
    return { success: false };
  }
});

const signUpWithGoogle = server$(async function (
  data: { email: string; idToken: string } & Omit<UserInfoProto, 'userId'>
) {
  try {
    const response = await googleOAuthMain.signUp(data);
    if (response.body.code === 201000) {
      return { success: true };
    }
    return { success: false };
  } catch (err) {
    return { success: false };
  }
});

const createUserInfoRole = server$(async function (description: string) {
  try {
    const response = await userInfoRoleMain.createOne({ description });

    if (response.body.code === 201000) {
      return response.body.data.userInfoRole;
    }
    return undefined;
  } catch (err) {
    return undefined;
  }
});

const createUserInfoGoal = server$(async function (description: string) {
  try {
    const response = await userInfoGoalMain.createOne({ description });

    if (response.body.code === 201000) {
      return response.body.data.userInfoGoal;
    }
    return undefined;
  } catch (err) {
    return undefined;
  }
});

export interface UserSignUpFormProps {
  class?: string;
}

export const UserSignUpProfileForm = component$<UserSignUpFormProps>(
  (props) => {
    const toastList = useContext(ToastListContext);
    const t = inlineTranslate();
    const emailInCode = useSignUpEmail();
    const loc = useLocation();
    const companySizeLoaded = useCompanySize();
    const userInfoRoleLoaded = useUserInfoRole();
    const userInfoGoalLoaded = useUserInfoGoal();

    const email = useInputText(emailInCode.value.data || '');
    const showPw = useComputed$(() => {
      const code = loc.url.searchParams.get('code');
      return typeof code === 'string';
    });
    const pw = useInputText('');
    const pwConfirm = useInputText('');
    const companyName = useInputText('');
    const companyUrl = useInputText('');
    const companySize = useSignal<string | undefined>(undefined);
    const userInfoRole = useSignal<string | undefined>(undefined);
    const userInfoRoleOther = useSignal<string>('');
    const userInfoGoal = useSignal<string | undefined>(undefined);
    const userInfoGoalOther = useSignal<string>('');

    const marketingApproval = useSignal(false);

    const pwInfo = usePwMatchInfo(pw, pwConfirm);
    const pwLengthInfo = usePwLengthInfo(pw);
    const pwValidInfo = usePwValidInfo(pw);
    const {
      submitStatus,
      onSubmit$: onSubmitStatus$,
      onSubmitCompleted$: onStatusSubmitCompleted$,
    } = useSubmitStatus(
      showPw,
      pwInfo,
      companyName,
      companyUrl,
      companySize,
      userInfoRole,
      userInfoGoal
    );

    const onClickSubmit$ = $(async () => {
      // 여기는 무조건 있지만

      const companySizeId = companySizeLoaded.value.find(
        (c) => c.tag === companySize.value
      )?.id;

      if (!companySizeId) {
        toastList.addToast$({ tag: 'dynamic.error.server', type: 'error' });
        return;
      }

      // 아래 두개는 없을 수 있음. 그러면 others인거고 추가로 생성해줘야함
      let roleId = userInfoRoleLoaded.value.find(
        (c) => c.tag === userInfoRole.value
      )?.id;
      if (roleId === undefined) {
        const description = userInfoRoleOther.value;
        const userInfoRoleCreated = await createUserInfoRole(description);
        if (userInfoRoleCreated === undefined) {
          toastList.addToast$(serverErrorToast);

          return;
        }

        roleId = userInfoRoleCreated.id;
      }

      let goalId = userInfoGoalLoaded.value.find(
        (c) => c.tag === userInfoGoal.value
      )?.id;
      if (goalId === undefined) {
        const description = userInfoRoleOther.value;
        const userInfoGoalCreated = await createUserInfoGoal(description);
        if (userInfoGoalCreated === undefined) {
          toastList.addToast$(serverErrorToast);

          return;
        }

        goalId = userInfoGoalCreated.id;
      }

      await onSubmitStatus$();

      const emailLow = email.value.toLowerCase();

      const signUpCodeId = (() => {
        const query = loc.url.searchParams.get('code');
        if (query === null) return undefined;
        return trimTailSlash(query);
      })();
      if (signUpCodeId) {
        const { success } = await signUpWithPw({
          email: emailLow,
          pw: pw.value,
          marketingApproval: marketingApproval.value,
          companyName: companyName.value,
          companyUrl: companyUrl.value,
          companySizeId,
          roleId,
          goalId,
          signUpCodeId,
        });

        if (success) {
          await signIn({ email: emailLow, pw: pw.value });
          window.location.href = '/console?msg=welcome';
          return;
        }
        toastList.addToast$(serverErrorToast);
        return;
      }

      const idToken = (() => {
        const query = loc.url.searchParams.get('googleIdToken');
        if (query === null) return undefined;
        return trimTailSlash(query);
      })();
      if (idToken) {
        const { success } = await signUpWithGoogle({
          email: emailLow,
          marketingApproval: marketingApproval.value,
          companyName: companyName.value,
          companyUrl: companyUrl.value,
          companySizeId,
          roleId,
          goalId,
          idToken,
        });

        if (success) {
          const { message } = await googleAuth(idToken);
          if (message === 'sign-in') {
            window.location.href = '/console?msg=welcome';
            return;
          }
        }
        toastList.addToast$(serverErrorToast);
        return;
      }

      toastList.addToast$(serverErrorToast);
      onStatusSubmitCompleted$();
    });

    return (
      <div class={cx(s.wrapper, props.class)}>
        <h1 class={s.title}>{t('usersSignUpProfile.form.title')}</h1>
        <Form class={cx(props.class)}>
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
          {showPw.value && (
            <InputPassword
              label="password"
              pw={pw}
              pwConfirm={pwConfirm}
              infoMatch={pwInfo.value}
              infoLength={pwLengthInfo.value}
              infoValid={pwValidInfo.value}
            />
          )}

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
              <fieldset name="companySize">
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
              </fieldset>
            </div>

            <div class={s.radios}>
              <div class={s.label}>role</div>
              <fieldset name="userInfoRole">
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
                <InputRadioOthers
                  class={s.radio}
                  id={`userInfoRole-${'others'}`}
                  radioName="userInfoRole"
                  textLabel="userInfoRole-others"
                  textName="userInfoRole-others"
                  value={'others'}
                  label={'others:'}
                  bindRadio={userInfoRole}
                  bindText={userInfoRoleOther}
                />
              </fieldset>
            </div>

            <div class={s.radios}>
              <div class={s.label}>goal</div>
              <fieldset name="userInfoGoal">
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
                <InputRadioOthers
                  class={s.radio}
                  id={`userInfoGoal-${'others'}`}
                  radioName="userInfoGoal"
                  textLabel="userInfoGoal-others"
                  textName="userInfoGoal-others"
                  value={'others'}
                  label={'others:'}
                  bindRadio={userInfoGoal}
                  bindText={userInfoGoalOther}
                />
              </fieldset>
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
            type="button"
            onClick$={onClickSubmit$}
            class={s.submit}
            status={submitStatus.value}
            label={t('usersSignUpProfile.form.submit')}
          />
        </Form>
      </div>
    );
  }
);
