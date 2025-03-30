import { component$ } from '@builder.io/qwik';
import { logoUrl } from '~/infra/cloudflare/image';
import { s } from './styles.css';
import { cx } from '~/styled-system/css';
import { pageX } from '~/styled-system/patterns';
import { calcSrc } from '~/infra/cloudflare/cf-image-rule.pure';
import { inlineTranslate } from 'qwik-speak';
import { buttonRecipe } from '~/styles/button.recipe';

export interface HeaderProps {
  class?: string;
}

export const Header = component$<HeaderProps>((props) => {
  const t = inlineTranslate();

  return (
    <div class={cx(s.wrapper, props.class)}>
      <div class={cx(pageX(), s.container)}>
        <a href="/" class={s.logo}>
          <img
            src={calcSrc(logoUrl, 360)}
            alt={'ai-scheduler logo'}
            width={84}
            height={84}
          />
        </a>
        <nav>
          <ul class={s.navUl}>
            <li class={s.navItem}>
              <a href={'/'}>{t('base.nav.home')}</a>
            </li>
            <li class={s.navItem}>
              <a href={'/waitlist'}>{t('base.nav.waitlist')}</a>
            </li>
          </ul>
        </nav>
        <div>
          <a
            class={cx(
              buttonRecipe({
                priority: 'secondary',
                size: 'base',
                rounded: 'full',
              }),
              s.signInBtn
            )}
            href={'/users/sign-in'}
          >
            {t('base.user.sign-in')}
          </a>
        </div>
      </div>
    </div>
  );
});
