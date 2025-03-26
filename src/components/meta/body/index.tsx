import { component$ } from '@builder.io/qwik';
import { RouterOutlet } from '@builder.io/qwik-city';
import { useSpeakLocale } from 'qwik-speak';

export const Body = component$(() => {
  const locale = useSpeakLocale();

  return (
    <body lang={locale.lang}>
      <RouterOutlet />
    </body>
  );
});
