import { useSignal } from '@builder.io/qwik';
import { InputInfoType } from '~/libs/html/type';

export const useInputInfo = (init: InputInfoType | undefined) => {
  const info = useSignal<InputInfoType | undefined>(init);

  return info;
};
