import type { Meta, StoryObj } from 'storybook-framework-qwik';
import { action } from '@storybook/addon-actions';
import { fn } from '@storybook/test';
import { DevController, type DevControllerProps } from '.';
import { $ } from '@builder.io/qwik';

const meta: Meta<DevControllerProps> = {
  component: DevController,
  args: {},
  argTypes: {},
};

type Story = StoryObj<DevControllerProps>;

export default meta;

export const Base: Story = {
  render: (props: DevControllerProps) => <DevController {...props}>Some button</DevController>,
};
