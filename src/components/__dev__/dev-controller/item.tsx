import { $, component$, useSignal } from '@builder.io/qwik';
import { cx } from '~/styled-system/css';
import { s } from './item.css';

interface Link {
  tag: string;
  href: string;
}

export interface SectionLinkProps {
  class?: string;
  section: string;
  links: Link[];
  initOpened?: boolean;
}

export const SectionLink = component$<SectionLinkProps>((props) => {
  const isOpened = useSignal(props.initOpened);

  const onClick$ = $(() => {
    isOpened.value = !isOpened.value;
  });

  return (
    <div class={cx(s.wrapper, props.class)}>
      <button class={s.button} onClick$={onClick$}>
        {props.section}
      </button>
      {isOpened.value && (
        <nav class={s.nav}>
          <ul>
            {props.links.map((c) => (
              <li key={c.href}>
                <a class={s.navItem} href={c.href}>
                  - {c.tag}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
});
