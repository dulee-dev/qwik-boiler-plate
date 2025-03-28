import { component$ } from '@builder.io/qwik';
import { type DocumentHead } from '@builder.io/qwik-city';
import { FindPwSuccess } from '~/components/ui/templates/find-pw-success';

export default component$(() => {
  return <FindPwSuccess />;
});

export const head: DocumentHead = ({ resolveValue, params, head }) => {
  return {
    title: 'users-find-pw-success',
  };
};
