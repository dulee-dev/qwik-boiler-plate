import { Signal, useVisibleTask$ } from '@builder.io/qwik';
import { checkIsPwNoLength } from '~/domains/user/user-rule.pure';
import { useInputInfo } from '~/hooks/use-input-info';
import { InputInfoType } from '~/libs/html/type';
import { DEBOUNCE_TIME } from '~/libs/ux/ux.constant';

export const usePwValidInfo = (pw: Signal<string>) => {
  const info = useInputInfo(undefined);

  useVisibleTask$(({ track, cleanup }) => {
    track(() => pw.value);

    const timeout = setTimeout(async () => {
      const infoNext = await (async (): Promise<InputInfoType | undefined> => {
        const _pw = pw.value;
        const isValid = checkIsPwNoLength(_pw);

        if (_pw === '') return undefined;

        if (!isValid)
          return { type: 'error', tag: 'dynamic.info.pw.error.invalid' };

        return undefined;
      })();
      info.value = infoNext;
    }, DEBOUNCE_TIME);

    cleanup(() => clearTimeout(timeout));
  });

  return info;
};
