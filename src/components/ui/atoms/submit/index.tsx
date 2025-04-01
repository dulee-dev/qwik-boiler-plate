import { component$ } from '@builder.io/qwik';
import { cx } from '~/styled-system/css';
import { buttonRecipe } from '~/styles/button.recipe';
import { s } from './styles.css';
import { FaCircleNotchSolid } from '@qwikest/icons/font-awesome';

export type SubmitStatus = 'idle' | 'disable' | 'loading';

export interface SubmitProps {
  class?: string;
  status: SubmitStatus;
  label: string;
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
    >
      {props.status === 'loading' ? (
        <FaCircleNotchSolid class={s.loading} />
      ) : (
        props.label
      )}
    </button>
  );
});
