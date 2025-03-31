import { $, component$, QRL, useContext, useSignal } from '@builder.io/qwik';
import {
  FaCircleCheckSolid,
  FaCircleExclamationSolid,
  FaCircleInfoSolid,
  FaCircleXmarkSolid,
  FaXSolid,
} from '@qwikest/icons/font-awesome';
import {
  Toast as ToastInterface,
  ToastListContext,
} from '~/contexts/toast-list';
import { cx } from '~/styled-system/css';
import { s } from './styles.css';
import { inlineTranslate } from 'qwik-speak';

const animationDuration = 500;

export interface ToastListProps {
  class?: string;
}

export const Toast = component$<
  Omit<ToastInterface, 'id'> & { class?: string; onClick$: QRL<() => void> }
>((props) => {
  const { type, tag, class: className, onClick$ } = props;

  const t = inlineTranslate();

  const removing = useSignal(false);

  const onClickBtn$ = $(() => {
    removing.value = true;
    setTimeout(() => {
      onClick$();
    }, animationDuration); // exit animation duration
  });

  return (
    <div
      class={cx(
        s.toast,
        type === 'ok' && s.ok,
        type === 'warn' && s.warn,
        type === 'error' && s.error,
        removing.value ? s.remove : s.show,
        className
      )}
      data-direction={removing.value ? 'down' : 'top'}
    >
      {type === 'ok' && <FaCircleCheckSolid class={s.toastIcon} />}
      {type === 'info' && <FaCircleInfoSolid class={s.toastIcon} />}
      {type === 'warn' && <FaCircleExclamationSolid class={s.toastIcon} />}
      {type === 'error' && <FaCircleXmarkSolid class={s.toastIcon} />}
      <span class={s.toastText}>{t(tag)}</span>
      <button
        class={s.toastBtn}
        onClick$={() => {
          onClickBtn$();
        }}
      >
        <FaXSolid />
      </button>
    </div>
  );
});

export const ToastList = component$<ToastListProps>((props) => {
  const toastList = useContext(ToastListContext);

  return (
    <div class={cx(s.list, props.class)}>
      {toastList.toasts.map((c) => (
        <Toast
          key={c.id}
          type={c.type}
          tag={c.tag}
          onClick$={() => toastList.removeToast$(c.id)}
        />
      ))}
    </div>
  );
});
