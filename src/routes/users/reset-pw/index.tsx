import { component$ } from '@builder.io/qwik';
import { type DocumentHead } from '@builder.io/qwik-city';
import { ResetPw } from '~/components/ui/templates/reset-pw';

export default component$(() => {
  return <ResetPw />;
});

export const head: DocumentHead = ({ resolveValue, params, head }) => {
  return {
    title: 'users-reset-pw',
  };
};
