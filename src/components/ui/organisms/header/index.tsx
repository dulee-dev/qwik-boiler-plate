import { component$ } from '@builder.io/qwik';
import { logoUrl } from '~/infra/cloudflare/image';
import { s } from './styles.css';
import { cx } from '~/styled-system/css';
import { pageX } from '~/styled-system/patterns';
import { calcSrc } from '~/infra/cloudflare/cf-image-rule.pure';
import { inlineTranslate } from 'qwik-speak';
import { buttonRecipe } from '~/styles/button.recipe';
import { useAuthUser } from '~/server/loader/use-auth-user.loader';

export interface HeaderProps {
  class?: string;
  size?: 'base' | 'wide';
}

export const Header = component$<HeaderProps>((props) => {
  const t = inlineTranslate();
  const authUser = useAuthUser();

  return (
    <div class={cx(s.wrapper, props.class)}>
      <div class={cx(pageX({ size: props.size }), s.container)}>
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
        {authUser.value === undefined ? (
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
        ) : (
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
              href={'/console'}
            >
              {authUser.value.email}
            </a>
          </div>
        )}
      </div>
    </div>
  );
});
