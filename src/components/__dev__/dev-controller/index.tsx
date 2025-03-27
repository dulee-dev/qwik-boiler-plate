import { $, component$, useContext } from '@builder.io/qwik';
import { cx } from '~/styled-system/css';
import { s } from './styles.css';
import { DevControllerContext } from '~/contexts/dev-controller';

export interface DevControllerProps {
  class?: string;
}

interface Link {
  key: string;
  tag: string;
  href: string;
}

const links: Link[] = [
  {
    key: '1',
    tag: '홈',
    href: '/',
  },
  {
    key: '2',
    tag: '사전예약',
    href: '/waitlist',
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
        <div class={s.nav}>
          <nav>
            <ul>
              {links.map((c) => (
                <li key={c.key}>
                  <a href={c.href}>{c.tag}</a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
      <button class={s.button} onClick$={onClick$} />
    </div>
  );
});
