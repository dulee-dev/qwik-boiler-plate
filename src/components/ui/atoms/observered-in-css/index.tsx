import { $, component$, Slot, useSignal } from '@builder.io/qwik';
import { useObserver } from '~/hooks/use-observer';
import { cx } from '~/styled-system/css';

export interface ObserveredInCssProps {
  class?: string;
  inClass: string;
  'data-direction'?: string;
  threshhold?: number;
}

export const ObserveredInCss = component$<ObserveredInCssProps>((props) => {
  const ref = useSignal<HTMLElement>();

  const observed = useSignal(false);
  const onObserve$ = $(() => {
    observed.value = true;
  });

  useObserver({
    ref,
    onObserve$,
    threshhold: props.threshhold,
  });
  return (
    <div
      ref={ref}
      class={cx(props.class, observed.value && props.inClass)}
      data-direction={props['data-direction']}
    >
      <Slot />
    </div>
  );
});
