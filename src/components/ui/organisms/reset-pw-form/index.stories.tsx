import type { Meta, StoryObj } from 'storybook-framework-qwik';
import { action } from '@storybook/addon-actions';
import { fn } from '@storybook/test';
import { ResetPwForm, type ResetPwFormProps } from '.';
import { $ } from '@builder.io/qwik';

const meta: Meta<ResetPwFormProps> = {
  component: ResetPwForm,
  args: {},
  argTypes: {},
};

type Story = StoryObj<ResetPwFormProps>;

export default meta;

export const Base: Story = {
  render: (props: ResetPwFormProps) => <ResetPwForm {...props} />,
};
