import { component$, QRL } from '@builder.io/qwik';
import { cx } from '~/styled-system/css';
import { buttonRecipe } from '~/styles/button.recipe';
import { s } from './styles.css';
import { FaCircleNotchSolid } from '@qwikest/icons/font-awesome';

export type SubmitStatus = 'idle' | 'disable' | 'loading';

export interface SubmitProps {
  class?: string;
  status: SubmitStatus;
  label: string;
  type?: 'submit' | 'button' | 'reset';
  onClick$?: QRL<() => any>;
}

export const Submit = component$<SubmitProps>((props) => {
  return (
    <button
      class={cx(
        buttonRecipe({
          priority: props.status === 'idle' ? 'primary' : 'disabled',
        }),
        s.submit,
        props.class
      )}
      disabled={props.status !== 'idle'}
      type={props.type ?? 'submit'}
      onClick$={props.onClick$}
    >
      {props.status === 'loading' ? (
        <FaCircleNotchSolid class={s.loading} />
      ) : (
        props.label
      )}
    </button>
  );
});
