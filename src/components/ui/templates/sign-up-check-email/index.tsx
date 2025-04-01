import { component$, useComputed$ } from '@builder.io/qwik';
import { Header } from '../../organisms/header';
import { Footer } from '../../organisms/footer';
import { s } from './styles.css';
import { inlineTranslate } from 'qwik-speak';
import { FaCheckSolid } from '@qwikest/icons/font-awesome';
import { useLocation } from '@builder.io/qwik-city';

export interface FindPwProps {
  class?: string;
}

const removeTrailingSlash = (url: string): string =>
  url.endsWith('/') ? url.slice(0, -1) : url;

export const SignUpCheckEmail = component$<FindPwProps>((props) => {
  const t = inlineTranslate();
  const loc = useLocation();
  const email = useComputed$(() => {
    return removeTrailingSlash(loc.url.searchParams.get('email') ?? 'null');
  });

  return (
    <>
      <Header />
      <main class={s.main}>
        <h1 class={s.title}>
          <FaCheckSolid class={s.checkIcon} />
          <span>{t('usersSignUpCheckEmail.main.title')}</span>
        </h1>
        <div class={s.desc}>{t('usersSignUpCheckEmail.main.desc')}</div>
        <div class={s.email}>{email.value}</div>
      </main>
      <Footer />
    </>
  );
});
