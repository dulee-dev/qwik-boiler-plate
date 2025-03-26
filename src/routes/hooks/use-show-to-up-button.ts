import { $, useContext, useOnDocument, useSignal } from '@builder.io/qwik';
import { ConfigContext } from '~/contexts/use-config';

export const useShowToUpButton = () => {
  const show = useSignal(false);

  const config = useContext(ConfigContext);

  const onScrollEnd$ = $(() => {
    const showNext =
      (config.isMobile && window.scrollY > 1200) || window.scrollY > 1500;

    show.value = showNext;
  });

  useOnDocument('scrollend', onScrollEnd$);

  return show;
};
