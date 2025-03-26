import type { Meta, StoryObj } from 'storybook-framework-qwik';
import { action } from '@storybook/addon-actions';
import { fn } from '@storybook/test';
import { ObserveredInCss, type ObserveredInCssProps } from '.';
import { $ } from '@builder.io/qwik';
import { css } from '~/styled-system/css';

const meta: Meta<ObserveredInCssProps> = {
  component: ObserveredInCss,
  args: {
    inClass: css({ animationStyle: 'fade-in' }),
  },
  argTypes: {},
};

type Story = StoryObj<ObserveredInCssProps>;

export default meta;

export const Base: Story = {
  render: (props: ObserveredInCssProps) => (
    <ObserveredInCss {...props}>Slot</ObserveredInCss>
  ),
};
