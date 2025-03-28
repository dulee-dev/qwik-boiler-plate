import { component$ } from '@builder.io/qwik';
import { type DocumentHead } from '@builder.io/qwik-city';
import { SignUp } from '~/components/ui/templates/sign-up';

export default component$(() => {
  return <SignUp />;
});

export const head: DocumentHead = ({ resolveValue, params, head }) => {
  return {
    title: 'users-sign-up',
  };
};
