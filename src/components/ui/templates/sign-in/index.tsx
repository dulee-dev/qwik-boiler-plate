import { component$ } from '@builder.io/qwik';
import { Header } from '../../organisms/header';
import { Footer } from '../../organisms/footer';
import { UserSignInForm } from '../../organisms/user-sign-in-form';
import { s } from './styles.css';
import { cx } from '~/styled-system/css';
import { pageX } from '~/styled-system/patterns';

export interface SignInProps {
  class?: string;
}

export const SignIn = component$<SignInProps>((props) => {
  return (
    <>
      <Header />
      <main class={cx(pageX(), s.main)}>
        <UserSignInForm class={s.form} />
      </main>
      <Footer />
    </>
  );
});
