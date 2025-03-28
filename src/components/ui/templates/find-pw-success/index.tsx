import { component$ } from '@builder.io/qwik';
import { Header } from '../../organisms/header';
import { Footer } from '../../organisms/footer';
import { s } from './styles.css';
import { inlineTranslate } from 'qwik-speak';
import { FaCheckSolid } from '@qwikest/icons/font-awesome';

export interface FindPwProps {
  class?: string;
}

export const FindPwSuccess = component$<FindPwProps>((props) => {
  const t = inlineTranslate();

  return (
    <>
      <Header />
      <main class={s.main}>
        <h1 class={s.title}>
          <FaCheckSolid class={s.checkIcon} />
          <span>
            {t('users-find-pw-success.main.title@@이메일이 발송되었습니다')}
          </span>
        </h1>
        <div class={s.desc}>
          <span class={s.email}>{'duleedev@duleelab.com'}</span>
          {` `}
          <span>
            {t('users-find-pw-success.main.desc@@이메일을 확인해주세요')}
          </span>
        </div>
      </main>
      <Footer />
    </>
  );
});
