import { $, component$ } from '@builder.io/qwik';
import { useNavigate, type DocumentHead } from '@builder.io/qwik-city';
import { Home } from '~/components/ui/templates/home';
import { useAutofillImage } from './hooks/use-autofill-image';
import { useShowToUpButton } from './hooks/use-show-to-up-button';
import { ga } from '~/analysis/google/gtag';

export default component$(() => {
  const nav = useNavigate();

  const autofillImage = useAutofillImage();
  const show = useShowToUpButton();
  const onClickToWaitlist$ = $(async () => {
    ga.nav('hero_lead', 'lead');
    await nav('/waitlist');
  });
  const onClickToUpButton$ = $(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  return (
    <Home
      autoFillImg={autofillImage.value}
      showToUpButton={show.value}
      onClickToWaitlist$={onClickToWaitlist$}
      onClickToUpButton$={onClickToUpButton$}
    />
  );
});

export const head: DocumentHead = ({ resolveValue, params, head }) => {
  return {
    title: 'home',
  };
};
