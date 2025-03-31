import { $, Signal, useSignal, useTask$ } from '@builder.io/qwik';
import { SubmitStatus } from '~/components/ui/atoms/submit';
import { InputInfoType } from '~/libs/html/type';

export const useSubmitStatus = (
  emailInfo: Signal<InputInfoType | undefined>,
  pw: Signal<string>
) => {
  const status = useSignal<SubmitStatus>('disable');

  useTask$(({ track }) => {
    const isEmailOk = track(() => emailInfo.value?.type) === undefined;
    const isPwOk = track(() => pw.value !== '');

    const isOk = isEmailOk && isPwOk;
    status.value = isOk ? 'idle' : 'disable';
  });

  const onSubmit$ = $(() => {
    status.value = 'loading';
  });

  const onSubmitCompleted$ = $(() => {
    status.value = 'idle';
  });

  return { status, onSubmit$, onSubmitCompleted$ };
};
