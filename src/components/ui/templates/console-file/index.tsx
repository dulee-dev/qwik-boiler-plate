import { component$ } from '@builder.io/qwik';
import { cx } from '~/styled-system/css';
import { Header } from '../../organisms/header';
import { Footer } from '../../organisms/footer';

export interface ConsoleFileProps {
  class?: string;
}

export const ConsoleFile = component$<ConsoleFileProps>((props) => {
  return (
    <div class={cx(props.class)}>
      <Header size="wide" />
      <Footer size="wide" />
    </div>
  );
});
