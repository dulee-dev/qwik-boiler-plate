import { component$, QRL } from '@builder.io/qwik';
import { Header } from '@src/components/ui/organisms/header';
import { s } from './styles.css';
import { cx } from '~/styled-system/css';
import { pageX } from '~/styled-system/patterns';
import { FaChevronDownSolid } from '@qwikest/icons/font-awesome';
import { FeatureCard } from '@src/components/ui/molecules/feature-card';
import { Footer } from '../../organisms/footer';
import { FloatingBtn } from '../../atoms/floating-btn';
import { inlineTranslate } from 'qwik-speak';
import { ObserveredInCss } from '../../atoms/observered-in-css';
import { builGaQuery } from '~/analysis/ga/ga';

export interface HomeProps {
  autoFillImg: string;
  showToUpButton: boolean;
  onClickToUpButton$: QRL<() => any>;
}

export const Home = component$<HomeProps>((props) => {
  const t = inlineTranslate();

  return (
    <div class={s.wrapper}>
      <Header />
      <header class={cx(pageX(), s.hero)}>
        <div class={s.heroContent}>
          <h1 class={s.heroTitle}>{t('home.hero.title')}</h1>
          <div class={s.heroSubTitle}>{t('home.hero.desc')}</div>
        </div>
        <a
          class={s.heroCta}
          href={`/waitlist?${builGaQuery({ campaign: 'cta', medium: 'hero-btn' })}`}
        >
          {t('home.hero.cta')}
        </a>
        <a class={s.heroLink} href={'#feature-cards'}>
          <FaChevronDownSolid />
        </a>
      </header>
      <div class={s.cardBox}>
        <nav
          class={cx(pageX({ type: 'padding' }), s.featureCards)}
          id="feature-cards"
        >
          <FeatureCard
            targetId={'autofill'}
            tag={t('home.features.autofill')}
            glabel={'autofill'}
          />
          <FeatureCard
            targetId={'create'}
            tag={t('home.features.create')}
            glabel={'create'}
          />
          <FeatureCard
            targetId={'communication'}
            tag={t('home.features.communication')}
            glabel={'communication'}
          />
          <FeatureCard
            targetId={'active'}
            tag={t('home.features.active')}
            glabel={'active'}
          />
          <FeatureCard
            targetId={'analysis'}
            tag={t('home.features.analysis')}
            glabel={'analysis'}
          />
        </nav>
      </div>
      <section id={'autofill'} class={cx(pageX(), s.firstSection, s.section)}>
        <ObserveredInCss
          class={s.sectionContent}
          inClass={s.fadeIn}
          threshhold={1}
        >
          <h2 class={s.sectionTitle}>{t('home.features.autofill')}</h2>
          <div>{t('home.features.autofill')}</div>
        </ObserveredInCss>
        <ObserveredInCss
          class={s.fadeInOrigin}
          inClass={s.slideUpFadeIn}
          data-direction="top"
          threshhold={0.5}
        >
          <img
            src={props.autoFillImg}
            class={s.autofillImg}
            alt="autofill"
            width={747}
            height={793}
          />
        </ObserveredInCss>
      </section>
      <section id={'create'} class={cx(pageX(), s.section)}>
        <ObserveredInCss
          class={s.sectionContent}
          inClass={s.fadeIn}
          threshhold={1}
        >
          <h2 class={s.sectionTitle}>{t('home.features.create')}</h2>
          <div>{t('home.features.create')}</div>
        </ObserveredInCss>
        <ObserveredInCss
          class={s.fadeInOrigin}
          inClass={s.slideUpFadeIn}
          data-direction="top"
          threshhold={0.5}
        >
          <img
            src={
              'https://imagedelivery.net/sO38Ra7xK9C5jR-qJrdsOw/93b15417-9432-4cb3-85aa-f3e4fb739100/w1536'
            }
            class={s.generateImg}
            alt="generate"
            width={1440}
            height={954}
          />
        </ObserveredInCss>
      </section>
      <section id={'communication'} class={cx(pageX(), s.section)}>
        <ObserveredInCss
          class={s.sectionContent}
          inClass={s.fadeIn}
          threshhold={1}
        >
          <h2 class={s.sectionTitle}>{t('home.features.communication')}</h2>
          <div>{t('home.features.communication')}</div>
        </ObserveredInCss>

        <ObserveredInCss
          class={s.fadeInOrigin}
          inClass={s.slideUpFadeIn}
          data-direction="top"
          threshhold={0.5}
        >
          <img
            src={
              'https://imagedelivery.net/sO38Ra7xK9C5jR-qJrdsOw/7548a108-ac4a-484c-f333-7fc42579f400/w1536'
            }
            class={s.noticeImg}
            alt="generate"
            width={1440}
            height={954}
          />
        </ObserveredInCss>
      </section>
      <section id={'active'} class={cx(pageX(), s.section)}>
        <ObserveredInCss
          class={s.sectionContent}
          inClass={s.fadeIn}
          threshhold={1}
        >
          <h2 class={s.sectionTitle}>{t('home.features.active')}</h2>
          <div>{t('home.features.active')}</div>
        </ObserveredInCss>

        <ObserveredInCss
          class={s.fadeInOrigin}
          inClass={s.slideUpFadeIn}
          data-direction="top"
          threshhold={0.5}
        >
          <img
            src={
              'https://imagedelivery.net/sO38Ra7xK9C5jR-qJrdsOw/f34c9abe-5de4-41be-bc24-fb3ae9dc7f00/w1536'
            }
            class={s.noticeImg}
            alt="generate"
            width={1377}
            height={277}
          />
        </ObserveredInCss>
      </section>
      <section id={'analysis'} class={cx(pageX(), s.section)}>
        <ObserveredInCss
          class={s.sectionContent}
          inClass={s.fadeIn}
          threshhold={1}
        >
          <h2 class={s.sectionTitle}>{t('home.features.analysis')}</h2>
          <div>{t('home.features.analysis')}</div>
        </ObserveredInCss>

        <ObserveredInCss
          class={s.fadeInOrigin}
          inClass={s.slideUpFadeIn}
          data-direction="top"
          threshhold={0.5}
        >
          <img
            src={
              'https://imagedelivery.net/sO38Ra7xK9C5jR-qJrdsOw/5694ff25-5832-4d97-2c83-861368a30500/w1536'
            }
            class={s.noticeImg}
            alt="generate"
            width={1440}
            height={376}
          />
        </ObserveredInCss>
      </section>
      {props.showToUpButton && (
        <FloatingBtn onClick$={props.onClickToUpButton$} />
      )}
      <Footer />
    </div>
  );
});
