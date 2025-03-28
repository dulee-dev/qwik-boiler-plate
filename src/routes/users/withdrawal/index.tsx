import { component$ } from '@builder.io/qwik';
import { type DocumentHead } from '@builder.io/qwik-city';
import { Withdrawal } from '~/components/ui/templates/withdrawal';

export default component$(() => {
  return <Withdrawal />;
});

export const head: DocumentHead = ({ resolveValue, params, head }) => {
  return {
    title: 'users-withdrawal',
  };
};
