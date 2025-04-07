import { $, Signal, useSignal, useTask$ } from '@builder.io/qwik';
import { SubmitStatus } from '~/components/ui/atoms/submit';
import { InputInfoType } from '~/libs/html/type';

export const useSubmitStatus = (
  showPw: Signal<boolean>,
  pwInfo: Signal<InputInfoType | undefined>,
  companyName: Signal<string>,
  companyUrl: Signal<string>,
  companySize: Signal<string | undefined>,
  userInfoRole: Signal<string | undefined>,
  userInfoGoal: Signal<string | undefined>
) => {
  const submitStatus = useSignal<SubmitStatus>('idle');

  useTask$(({ track }) => {
    const _showPw = track(() => showPw.value);
    const _pwInfo = track(() => pwInfo.value);
    const _companyName = track(() => companyName.value);
    const _companyUrl = track(() => companyUrl.value);
    const _companySize = track(() => companySize.value);
    const _userInfoRole = track(() => userInfoRole.value);
    const _userInfoGoal = track(() => userInfoGoal.value);

    const pwOk = _showPw ? _pwInfo?.type === 'ok' : true;
    const isOk =
      pwOk &&
      _companyName.length > 0 &&
      _companyName.length <= 128 &&
      _companyUrl.length > 0 &&
      _companyUrl.length <= 128 &&
      _companySize !== undefined &&
      _userInfoRole !== undefined &&
      _userInfoGoal !== undefined;

    submitStatus.value = isOk ? 'idle' : 'disable';
  });

  const onSubmit$ = $(() => {
    submitStatus.value = 'loading';
  });

  const onSubmitCompleted$ = $(() => {
    submitStatus.value = 'idle';
  });

  return { submitStatus, onSubmit$, onSubmitCompleted$ };
};
