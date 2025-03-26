import { $, component$, QRL, useSignal } from '@builder.io/qwik';
import { Header } from '@src/components/ui/organisms/header';
import { s } from './styles.css';
import { cx } from '~/styled-system/css';
import { Footer } from '../../organisms/footer';
import { inlineTranslate } from 'qwik-speak';
import { WaitlistBenefit } from '../../molecules/waitlist-benefit';
import { Form } from '@builder.io/qwik-city';
import { pageX } from '~/styled-system/patterns';
import { server$ } from '@builder.io/qwik-city';

export interface WaitlistProps {}

export const Waitlist = component$<WaitlistProps>((props) => {
  const t = inlineTranslate();
  const email = useSignal('');
  const onSubmit$ = $(async () => {
    console.log();
  });

  return (
    <div class={s.wrapper}>
      <Header />
      <main class={cx(pageX(), s.main)}>
        <h1 class={s.title}>{t('waitlist.main.title@@사전 예약 혜택')}</h1>
        <div class={s.desc}>
          {t('waitlist.main.desc@@누구보다 먼저 AI 어시스턴트를 체험해보세요!')}
        </div>
        <div class={s.cards}>
          <WaitlistBenefit
            class={s.card}
            content={t('waitlist.benefit.access@@1개월간\t무제한 사용')}
          />
          <WaitlistBenefit
            class={s.card}
            content={t('waitlist.benefit.notice@@출시 즉시 알림')}
          />
        </div>
        <Form class={s.form} onSubmit$={onSubmit$}>
          <label class={s.label} for="email">
            {t('waitlist.form.label@@이메일')}
          </label>
          <input
            class={s.input}
            id="email"
            placeholder="dulee@dev.com"
            type="email"
            autocomplete="email"
          />
          <button class={s.submit}>
            {t('waitlist.form.submit@@제출하기')}
          </button>
        </Form>
      </main>
      <Footer />
    </div>
  );
});
