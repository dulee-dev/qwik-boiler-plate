import { component$ } from '@builder.io/qwik';
import { cx } from '~/styled-system/css';
import { s } from './styles.css';

export interface WaitlistBenefitProps {
  class?: string;
  content: string;
}

export const WaitlistBenefit = component$<WaitlistBenefitProps>((props) => {
  return (
    <div class={cx(s.wrapper, props.class)}>
      <h2 class={s.content}>{props.content}</h2>
    </div>
  );
});
