import { component$ } from '@builder.io/qwik';
import { Header } from '../../organisms/header';
import { Footer } from '../../organisms/footer';
import { s } from './styles.css';
import { cx } from '~/styled-system/css';
import { pageX } from '~/styled-system/patterns';
import { WithdrawalForm } from '../../organisms/withdrawal-form';

export interface WithdrawalProps {
  class?: string;
}

export const Withdrawal = component$<WithdrawalProps>((props) => {
  return (
    <>
      <Header />
      <main class={cx(pageX(), s.main)}>
        <WithdrawalForm class={s.form} />
      </main>
      <Footer />
    </>
  );
});
