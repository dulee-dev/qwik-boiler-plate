import { component$ } from '@builder.io/qwik';
import { cx } from '~/styled-system/css';
import { s } from './styles.css';
import { FaCheckSolid, FaXSolid } from '@qwikest/icons/font-awesome';
import { InputInfoType } from '~/libs/html/type';
import { inlineTranslate } from 'qwik-speak';

export interface InputInfoProps {
  class?: string;
  info?: InputInfoType;
}

export const InputInfo = component$<InputInfoProps>((props) => {
  const t = inlineTranslate();

  return (
    <div class={cx(s.infoBox, props.class)}>
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
          <span>{t(props.info.tag || '')}</span>
        </span>
      )}
    </div>
  );
});
