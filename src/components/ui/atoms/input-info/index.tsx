import { component$ } from '@builder.io/qwik';
import { cx } from '~/styled-system/css';
import { s } from './styles.css';
import { FaCheckSolid, FaXSolid } from '@qwikest/icons/font-awesome';

export interface InputInfoProps {
  class?: string;
  info?: {
    type: 'ok' | 'error' | 'desc';
    text: string;
  };
}

export const InputInfo = component$<InputInfoProps>((props) => {
  return (
    <div class={s.infoBox}>
      {props.info && (
        <span
          class={cx(
            s.info,
            props.info.type === 'ok' && s.ok,
            props.info.type === 'error' && s.error
          )}
        >
          {props.info.type === 'ok' && <FaCheckSolid class={s.infoIcon} />}
          {props.info.type === 'error' && <FaXSolid class={s.infoIcon} />}
          <span>{props.info.text}</span>
        </span>
      )}
    </div>
  );
});
