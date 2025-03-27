import { $, component$ } from '@builder.io/qwik';
import { type DocumentHead } from '@builder.io/qwik-city';
import { Home } from '~/components/ui/templates/home';
import { useAutofillImage } from './hooks/use-autofill-image';
import { useShowToUpButton } from './hooks/use-show-to-up-button';

export default component$(() => {
  const autofillImage = useAutofillImage();
  const show = useShowToUpButton();
  const onClickToUpButton$ = $(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  return (
    <Home
      autoFillImg={autofillImage.value}
      showToUpButton={show.value}
      onClickToUpButton$={onClickToUpButton$}
    />
  );
});

export const head: DocumentHead = ({ resolveValue, params, head }) => {
  return {
    title: 'home',
  };
};
