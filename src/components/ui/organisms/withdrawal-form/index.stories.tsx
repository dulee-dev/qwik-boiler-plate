import type { Meta, StoryObj } from 'storybook-framework-qwik';
import { action } from '@storybook/addon-actions';
import { fn } from '@storybook/test';
import { WithdrawalForm, type WithdrawalFormProps } from '.';
import { $ } from '@builder.io/qwik';

const meta: Meta<WithdrawalFormProps> = {
  component: WithdrawalForm,
  args: {},
  argTypes: {},
};

type Story = StoryObj<WithdrawalFormProps>;

export default meta;

export const Base: Story = {
  render: (props: WithdrawalFormProps) => <WithdrawalForm {...props} />,
};
