import { $, Signal, useSignal, useTask$ } from '@builder.io/qwik';
import { SubmitStatus } from '~/components/ui/atoms/submit';
import { InputInfoType } from '~/libs/html/type';

export const useSubmitStatus = (pwInfo: Signal<InputInfoType | undefined>) => {
  const submitStatus = useSignal<SubmitStatus>('idle');

  useTask$(({ track }) => {
    const isPwOk = track(() => pwInfo.value?.type) === 'ok';

    const isOk = isPwOk;
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
