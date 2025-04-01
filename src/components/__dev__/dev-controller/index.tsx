import { $, component$, useContext } from '@builder.io/qwik';
import { cx } from '~/styled-system/css';
import { s } from './styles.css';
import { DevControllerContext } from '~/contexts/dev-controller';
import { SectionLink } from './item';
import { server$ } from '@builder.io/qwik-city';
import { reset } from '@__tests__/libs/teardown';
import { ToastListContext } from '~/contexts/toast-list';
import { signIn, signOut } from '~/server/auth/auth.effect';
import { userHumanFixtures } from '@shared/fixtures/db/user.fixture';
import { signUpCodeFixtures } from '@shared/fixtures/db/sign-up-code.fixture';

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
    section: '유저',
    initOpened: false,
    links: [
      {
        tag: '회원가입(이메일 전송)',
        href: '/users/sign-up',
      },
      {
        tag: '회원가입(이메일 전송 완료)',
        href: '/users/sign-up/check-email/?email=q7y331xk@gmail.com',
      },
      {
        tag: '회원가입(프로필)',
        href: `/users/sign-up/profile/?code=${signUpCodeFixtures[0].id}`,
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
        tag: '비밀번호 초기화',
        href: '/users/reset-pw',
      },
    ],
  },
  {
    section: '콘솔',
    initOpened: false,
    links: [
      {
        tag: '홈',
        href: '/console',
      },
      {
        tag: '이미지',
        href: '/console/image',
      },
      {
        tag: '업로드 이미지',
        href: '/console/upload-image',
      },
      {
        tag: '파일',
        href: '/console/file',
      },
    ],
  },
];

const resetServer = server$(async () => {
  await reset();
});

export const DevController = component$<DevControllerProps>((props) => {
  const devController = useContext(DevControllerContext);
  const toastList = useContext(ToastListContext);

  const onClickController$ = $(() => {
    devController.isNavOpened = !devController.isNavOpened;
  });

  const onClickResetBtn$ = $(async () => {
    await resetServer();
    toastList.addToast$({
      type: 'ok',
      tag: '@@reset fixture',
    });
  });

  const onClickSignIn$ = $(async () => {
    await signIn({ email: userHumanFixtures[0].email, pw: '123123aa!' });
    toastList.addToast$({
      type: 'ok',
      tag: '@@sign-in',
    });
  });

  const onClickSignOut$ = $(async () => {
    await signOut();
    toastList.addToast$({
      type: 'ok',
      tag: '@@sign-out',
    });
  });

  return (
    <div class={cx(s.wrapper, props.class)}>
      {devController.isNavOpened && (
        <div>
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
          <button class={s.button} onClick$={onClickResetBtn$}>
            reset
          </button>
          <button class={s.button} onClick$={onClickSignIn$}>
            sign-in
          </button>
          <button class={s.button} onClick$={onClickSignOut$}>
            sign-out
          </button>
        </div>
      )}
      <button class={s.openButton} onClick$={onClickController$} />
    </div>
  );
});
