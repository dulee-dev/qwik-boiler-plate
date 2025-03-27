import { component$ } from '@builder.io/qwik';
import { cx } from '~/styled-system/css';
import { s } from './styles.css';
import { ga } from '~/analysis/ga/ga';

export interface FeatureCardProps {
  class?: string;
  tag: string;
  targetId: string;
  glabel: string;
}

export const FeatureCard = component$<FeatureCardProps>((props) => {
  return (
    <button
      class={cx(s.card, props.class)}
      onClick$={() => {
        ga.click({ label: props.glabel, campagin: 'feature_interest_test' });
        const el = document.getElementById(props.targetId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }}
    >
      {props.tag}
    </button>
  );
});
