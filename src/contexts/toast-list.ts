import { createContextId, QRL } from '@builder.io/qwik';

export const toastLifeMs = 3000;

export type ToastType = 'ok' | 'info' | 'warn' | 'error';

export type Toast = {
  id: string;
  tag: string;
  type: ToastType;
};

export type ToastListContextType = {
  toasts: Toast[];
  addToast$: QRL<
    (args: { tag: string; type: ToastType; lifeMs?: number | null }) => void
  >;
  removeToast$: QRL<(id: string) => void>;
};

export const ToastListContext = createContextId<ToastListContextType>(
  'root.toast-list-context'
);
