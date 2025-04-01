import { Signal, useVisibleTask$ } from '@builder.io/qwik';
import { checkIsEmail } from '~/domains/user/user-rule.pure';
import { useInputInfo } from '~/hooks/use-input-info';
import { InputInfoType } from '~/libs/html/type';
import { DEBOUNCE_TIME } from '~/libs/ux/ux.constant';

export const useEmailInfo = (email: Signal<string>) => {
  const emailInfo = useInputInfo({ type: 'idle', tag: '' });

  useVisibleTask$(({ track, cleanup }) => {
    track(() => email.value);

    const timeout = setTimeout(async () => {
      const infoNext = await (async (): Promise<InputInfoType | undefined> => {
        const _email = email.value;

        if (_email === '') {
          return { type: 'idle', tag: '' };
        }

        const isEmail = checkIsEmail(_email);
        if (!isEmail)
          return { type: 'error', tag: 'dynamic.info.email.error.invalid' };

        return undefined;
      })();
      emailInfo.value = infoNext;
    }, DEBOUNCE_TIME);

    cleanup(() => clearTimeout(timeout));
  });

  return emailInfo;
};
