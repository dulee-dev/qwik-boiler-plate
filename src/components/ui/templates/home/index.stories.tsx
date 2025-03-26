import type { Meta, StoryObj } from 'storybook-framework-qwik';
import { action } from '@storybook/addon-actions';
import { fn } from '@storybook/test';
import { Home, type HomeProps } from '.';
import { $ } from '@builder.io/qwik';

const meta: Meta<HomeProps> = {
  component: Home,
  args: {},
  argTypes: {},
};

type Story = StoryObj<HomeProps>;

export default meta;

export const Base: Story = {
  render: (props: HomeProps) => <Home {...props}>Some button</Home>,
};
