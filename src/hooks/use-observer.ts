import {
  type NoSerialize,
  noSerialize,
  useStore,
  useVisibleTask$,
  type QRL,
  Signal,
} from '@builder.io/qwik';

interface Props {
  ref: Signal<HTMLElement | undefined>;
  onObserve$: QRL<() => any>;
  threshhold?: number;
}

export const useObserver = (props: Props) => {
  const observer = useStore<{ instance?: NoSerialize<IntersectionObserver> }>({
    instance: undefined,
  });

  useVisibleTask$(({ cleanup }) => {
    const { value: targetEl } = props.ref;
    if (targetEl) {
      observer.instance = noSerialize(
        new IntersectionObserver(
          (entries) => {
            const { isIntersecting } = entries[0];
            if (isIntersecting) props.onObserve$();
          },
          { threshold: props.threshhold }
        )
      );
      if (observer.instance) observer.instance.observe(targetEl);
    }
    cleanup(() => {
      if (observer.instance) observer.instance.disconnect();
    });
  });
};
