import { Parameters } from 'storybook-framework-qwik';

import '../src/global.css';

export const parameters: Parameters = {
  layout: 'fullscreen',
  a11y: {
    config: {},
    options: {
      checks: { 'color-contrast': { options: { noScroll: true } } },
      restoreScroll: true,
    },
  },
  options: {
    showRoots: true,
  },
  docs: {
    iframeHeight: '200px',
  },
};
