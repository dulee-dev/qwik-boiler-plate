import type { Meta, StoryObj } from 'storybook-framework-qwik';
import { action } from '@storybook/addon-actions';
import { fn } from '@storybook/test';
import { ResetPw, type ResetPwProps } from '.';
import { $ } from '@builder.io/qwik';

const meta: Meta<ResetPwProps> = {
  component: ResetPw,
  args: {},
  argTypes: {},
};

type Story = StoryObj<ResetPwProps>;

export default meta;

export const Base: Story = {
  render: (props: ResetPwProps) => <ResetPw {...props} />,
};
