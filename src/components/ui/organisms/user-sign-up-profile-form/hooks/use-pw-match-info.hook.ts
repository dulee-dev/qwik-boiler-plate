import { Signal, useVisibleTask$ } from '@builder.io/qwik';
import { checkIsPw } from '~/domains/user/user-rule.pure';
import { useInputInfo } from '~/hooks/use-input-info';
import { InputInfoType } from '~/libs/html/type';
import { DEBOUNCE_TIME } from '~/libs/ux/ux.constant';

export const usePwMatchInfo = (
  pw: Signal<string>,
  pwConfirm: Signal<string>
) => {
  const info = useInputInfo(undefined);

  useVisibleTask$(({ track, cleanup }) => {
    track(() => pw.value);
    track(() => pwConfirm.value);

    const timeout = setTimeout(async () => {
      const infoNext = await (async (): Promise<InputInfoType | undefined> => {
        const _pw = pw.value;
        const _pwConfirm = pwConfirm.value;
        if (_pw === '') return undefined;

        if (_pw !== _pwConfirm)
          return { type: 'error', tag: 'dynamic.info.pw.error.mismatch' };

        const lengthOk = _pw.length >= 8 && _pw.length <= 20;
        if (!lengthOk) return undefined;

        const isValid = checkIsPw(_pw);
        if (!isValid) return undefined;

        return { type: 'ok', tag: 'dynamic.info.ok.base' };
      })();
      info.value = infoNext;
    }, DEBOUNCE_TIME);

    cleanup(() => clearTimeout(timeout));
  });

  return info;
};
