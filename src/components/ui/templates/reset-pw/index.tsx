import { component$ } from '@builder.io/qwik';
import { Header } from '../../organisms/header';
import { Footer } from '../../organisms/footer';
import { s } from './styles.css';
import { cx } from '~/styled-system/css';
import { pageX } from '~/styled-system/patterns';
import { ResetPwForm } from '../../organisms/reset-pw-form';

export interface ResetPwProps {
  class?: string;
}

export const ResetPw = component$<ResetPwProps>((props) => {
  return (
    <>
      <Header />
      <main class={cx(pageX(), s.main)}>
        <ResetPwForm class={s.form} />
      </main>
      <Footer />
    </>
  );
});
