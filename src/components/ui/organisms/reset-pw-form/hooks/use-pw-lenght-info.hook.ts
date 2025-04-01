import { Signal, useVisibleTask$ } from '@builder.io/qwik';
import { useInputInfo } from '~/hooks/use-input-info';
import { InputInfoType } from '~/libs/html/type';
import { DEBOUNCE_TIME } from '~/libs/ux/ux.constant';

export const usePwLengthInfo = (pw: Signal<string>) => {
  const info = useInputInfo(undefined);

  useVisibleTask$(({ track, cleanup }) => {
    track(() => pw.value);

    const timeout = setTimeout(async () => {
      const infoNext = await (async (): Promise<InputInfoType | undefined> => {
        const _pw = pw.value;

        if (_pw === '') return undefined;

        const lengthOk = _pw.length >= 8 && _pw.length <= 20;
        if (!lengthOk)
          return { type: 'error', tag: 'dynamic.info.pw.error.length' };

        return undefined;
      })();
      info.value = infoNext;
    }, DEBOUNCE_TIME);

    cleanup(() => clearTimeout(timeout));
  });

  return info;
};
