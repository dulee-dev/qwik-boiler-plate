import { component$ } from '@builder.io/qwik';
import { type DocumentHead } from '@builder.io/qwik-city';
import { SignIn } from '~/components/ui/templates/sign-in';

export default component$(() => {
  return <SignIn />;
});

export const head: DocumentHead = ({ resolveValue, params, head }) => {
  return {
    title: 'users-sign-in',
  };
};
