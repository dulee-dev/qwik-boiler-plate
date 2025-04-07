import { Signal, useVisibleTask$ } from '@builder.io/qwik';
import { server$ } from '@builder.io/qwik-city';
import { checkIsEmail } from '~/domains/user/user-rule.pure';
import { useInputInfo } from '~/hooks/use-input-info';
import { userMain } from '~/infra/main/services/user/user-main.effect';
import { InputInfoType } from '~/libs/html/type';
import { DEBOUNCE_TIME } from '~/libs/ux/ux.constant';

const checkIsUnique = server$(
  async (email: string): Promise<undefined | boolean> => {
    const response = await userMain.findAllUsers({ email });
    if (response.body.code !== 200000) return undefined;

    const isUnique = response.body.data.users.length === 0;
    return isUnique;
  }
);

export const useEmailInfo = (email: Signal<string>) => {
  const info = useInputInfo(undefined);

  useVisibleTask$(({ track, cleanup }) => {
    track(() => email.value);

    const timeout = setTimeout(async () => {
      const infoNext = await (async (): Promise<InputInfoType | undefined> => {
        const _email = email.value.toLowerCase();

        if (_email === '') {
          return undefined;
        }

        const isEmail = checkIsEmail(_email);
        if (!isEmail)
          return { type: 'error', tag: 'dynamic.info.email.error.invalid' };

        const isUnique = await checkIsUnique(_email);

        if (isUnique === undefined)
          return { type: 'error', tag: 'dynamic.error.server' };

        if (isUnique === false)
          return { type: 'error', tag: 'dynamic.info.email.error.duplicated' };

        return { type: 'ok', tag: 'dynamic.info.ok.base' };
      })();
      info.value = infoNext;
    }, DEBOUNCE_TIME);

    cleanup(() => clearTimeout(timeout));
  });

  return info;
};
