import { EventHandler, QRL } from '@builder.io/qwik';

export type OnClick$<EV = PointerEvent, EL = HTMLButtonElement> = QRL<
  EventHandler<EV, EL>
>;
