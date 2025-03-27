import '../src/global.css';
import { Decorator, Parameters } from 'storybook-framework-qwik';
import { Component } from '@builder.io/qwik';
import { QwikCityMockProvider } from '@builder.io/qwik-city';

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
const withWrapper: Decorator = (Story: Component) => (
  <QwikCityMockProvider>
    <Story />
  </QwikCityMockProvider>
);

export const decorators: Decorator[] = [withWrapper];
