import { component$ } from '@builder.io/qwik';
import { Header } from '../../organisms/header';
import { Footer } from '../../organisms/footer';
import { s } from './styles.css';
import { cx } from '~/styled-system/css';
import { pageX } from '~/styled-system/patterns';
import { FindPwForm } from '../../organisms/find-pw-form';

export interface FindPwProps {
  class?: string;
}

export const FindPw = component$<FindPwProps>((props) => {
  return (
    <>
      <Header />
      <main class={cx(pageX(), s.main)}>
        <FindPwForm class={s.form} />
      </main>
      <Footer />
    </>
  );
});
