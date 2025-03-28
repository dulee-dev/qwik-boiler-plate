import { component$ } from '@builder.io/qwik';
import { cx } from '~/styled-system/css';
import { Header } from '../../organisms/header';
import { Footer } from '../../organisms/footer';
import { UserSignInForm } from '../../organisms/user-sign-in-form';
import { pageX } from '~/styled-system/patterns';
import { s } from './styles.css';
import { UserSignUpForm } from '../../organisms/user-sign-up-form';

export interface SignUpProps {
  class?: string;
}

export const SignUp = component$<SignUpProps>((props) => {
  return (
    <>
      <Header />
      <main class={cx(pageX(), s.main)}>
        <UserSignUpForm class={s.form} />
      </main>
      <Footer />
    </>
  );
});
