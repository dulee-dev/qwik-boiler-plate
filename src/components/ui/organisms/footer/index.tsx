import { component$ } from '@builder.io/qwik';
import { cx } from '~/styled-system/css';
import { s } from './styles.css';
import { pageX } from '~/styled-system/patterns';

export interface FooterProps {
  class?: string;
}

export const Footer = component$<FooterProps>((props) => {
  return (
    <div class={cx(s.wrapper, props.class)}>
      <div class={cx(pageX({ type: 'padding' }), s.content)}>
        <div>
          <h2 class={s.contactLabel}>contact</h2>
          <div>email: dulee.dev@gmail.com</div>
          <div>
            SNS:{' '}
            <a href="https://x.com/DuckyoungLee">
              <img
                class={s.xIcon}
                src="https://imagedelivery.net/sO38Ra7xK9C5jR-qJrdsOw/e7b9fce3-fe05-4eda-0099-ea11182b7300/w256"
                width={64}
                height={64}
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
});
