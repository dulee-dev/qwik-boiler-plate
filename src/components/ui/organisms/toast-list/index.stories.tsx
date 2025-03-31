import type { Meta, StoryObj } from 'storybook-framework-qwik';
import { action } from '@storybook/addon-actions';
import { fn } from '@storybook/test';
import { ToastList, type ToastListProps } from '.';
import { $ } from '@builder.io/qwik';

const meta: Meta<ToastListProps> = {
  component: ToastList,
  args: {},
  argTypes: {},
};

type Story = StoryObj<ToastListProps>;

export default meta;

export const Base: Story = {
  render: (props: ToastListProps) => <ToastList {...props}>Some button</ToastList>,
};
