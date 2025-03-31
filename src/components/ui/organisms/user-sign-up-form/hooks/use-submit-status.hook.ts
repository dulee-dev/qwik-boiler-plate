import { $, Signal, useSignal, useTask$ } from '@builder.io/qwik';
import { SubmitStatus } from '~/components/ui/atoms/submit';
import { InputInfoType } from '~/libs/html/type';

export const useSubmitStatus = (
  emailInfo: Signal<InputInfoType | undefined>,
  pwInfo: Signal<InputInfoType | undefined>
) => {
  const submitStatus = useSignal<SubmitStatus>('idle');

  useTask$(({ track }) => {
    const isEmailOk = track(() => emailInfo.value?.type) === 'ok';
    const isPwOk = track(() => pwInfo.value?.type) === 'ok';

    const isOk = isEmailOk && isPwOk;
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
