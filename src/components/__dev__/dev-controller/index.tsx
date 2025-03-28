import { $, component$, useContext } from '@builder.io/qwik';
import { cx } from '~/styled-system/css';
import { s } from './styles.css';
import { DevControllerContext } from '~/contexts/dev-controller';
import { SectionLink } from './item';

export interface DevControllerProps {
  class?: string;
}

interface Link {
  tag: string;
  href: string;
}

interface SectionLink {
  section: string;
  initOpened: boolean;
  links: Link[];
}

const links: (Link | SectionLink)[] = [
  {
    tag: '홈',
    href: '/',
  },
  {
    tag: '사전예약',
    href: '/waitlist',
  },
  {
    tag: '회원가입',
    href: '/users/sign-up',
  },
  {
    tag: '로그인',
    href: '/users/sign-in',
  },
  {
    tag: '비밀번호 찾기',
    href: '/users/find-pw',
  },
  {
    tag: '비밀번호 초기화',
    href: '/users/reset-pw',
  },
  {
    section: '테스트',
    initOpened: false,
    links: [
      {
        tag: '로그인',
        href: '/users/sign-in',
      },
      {
        tag: '로그인',
        href: '/users/sign-in',
      },
    ],
  },
];

export const DevController = component$<DevControllerProps>((props) => {
  const devController = useContext(DevControllerContext);

  const onClick$ = $(() => {
    devController.isNavOpened = !devController.isNavOpened;
  });

  return (
    <div class={cx(s.wrapper, props.class)}>
      {devController.isNavOpened && (
        <nav>
          <ul>
            {links.map((c) => {
              if ('tag' in c) {
                return (
                  <li key={c.href}>
                    <a class={s.navItem} href={c.href}>
                      {c.tag}
                    </a>
                  </li>
                );
              }
              return <SectionLink key={c.section} {...c} />;
            })}
          </ul>
        </nav>
      )}
      <button class={s.button} onClick$={onClick$} />
    </div>
  );
});
