import { createContextId } from '@builder.io/qwik';

export interface Config {
  isMobile: boolean;
}

export const ConfigContext = createContextId<Config>('root.config');
