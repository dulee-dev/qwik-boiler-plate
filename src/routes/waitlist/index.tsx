import { component$ } from '@builder.io/qwik';
import { DocumentHead } from '@builder.io/qwik-city';
import { Waitlist } from '~/components/ui/templates/waitlist';

export default component$(() => {
  return <Waitlist />;
});

export const head: DocumentHead = ({ resolveValue, params }) => {
  return {
    title: 'waitlist',
  };
};
