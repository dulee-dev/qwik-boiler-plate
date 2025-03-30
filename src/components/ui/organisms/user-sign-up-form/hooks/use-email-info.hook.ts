import { useSignal, useVisibleTask$ } from '@builder.io/qwik';
import { DEBOUNCE_TIME } from '~/libs/ux/ux.constant';

export const useEmailInfo = () => {
  const info = useSignal('');

  useVisibleTask$(({ track, cleanup }) => {
    const _info = track(() => info.value);

    const timeout = setTimeout(() => {
      info.value;
    }, DEBOUNCE_TIME);

    cleanup(() => clearTimeout(timeout));
  });
};
