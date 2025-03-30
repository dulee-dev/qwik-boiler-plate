import { useSignal } from '@builder.io/qwik';

export const useInputText = (init: string) => {
  const value = useSignal(init);

  return value;
};
