import { createContextId } from '@builder.io/qwik';

export interface Config {
  isNavOpened: boolean;
}

export const DevControllerContext = createContextId<Config>(
  'root.dev-controller'
);
