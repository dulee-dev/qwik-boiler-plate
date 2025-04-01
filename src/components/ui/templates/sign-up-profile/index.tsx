import { component$ } from '@builder.io/qwik';
import { cx } from '~/styled-system/css';
import { Header } from '../../organisms/header';
import { Footer } from '../../organisms/footer';
import { pageX } from '~/styled-system/patterns';
import { s } from './styles.css';
import { UserSignUpProfileForm } from '../../organisms/user-sign-up-profile-form';

export interface SignUpProps {
  class?: string;
}

export const SignUpProfile = component$<SignUpProps>((props) => {
  return (
    <>
      <Header />
      <main class={cx(pageX(), s.main)}>
        <UserSignUpProfileForm class={s.form} />
      </main>
      <Footer />
    </>
  );
});
