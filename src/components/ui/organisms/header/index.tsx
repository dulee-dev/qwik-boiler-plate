import { component$ } from '@builder.io/qwik';
import { logoUrl, srcWidth } from '~/infra/cloudflare/image';
import { s } from './styles.css';
import { cx } from '~/styled-system/css';
import { pageX } from '~/styled-system/patterns';

export interface HeaderProps {
  class?: string;
}

export const Header = component$<HeaderProps>((props) => {
  return (
    <div class={cx(s.wrapper, props.class)}>
      <div class={pageX()}>
        <a href="/" class={s.logo}>
          <img
            src={logoUrl + '/w' + srcWidth['360']}
            alt={'ai-scheduler logo'}
            width={84}
            height={84}
          />
        </a>
      </div>
    </div>
  );
});
