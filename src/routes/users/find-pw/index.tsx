import { component$ } from '@builder.io/qwik';
import { type DocumentHead } from '@builder.io/qwik-city';
import { FindPw } from '~/components/ui/templates/find-pw';

export default component$(() => {
  return <FindPw />;
});

export const head: DocumentHead = ({ resolveValue, params, head }) => {
  return {
    title: 'users-find-pw',
  };
};
