import type { Meta, StoryObj } from 'storybook-framework-qwik';
import { action } from '@storybook/addon-actions';
import { fn } from '@storybook/test';
import { Withdrawal, type WithdrawalProps } from '.';
import { $ } from '@builder.io/qwik';

const meta: Meta<WithdrawalProps> = {
  component: Withdrawal,
  args: {},
  argTypes: {},
};

type Story = StoryObj<WithdrawalProps>;

export default meta;

export const Base: Story = {
  render: (props: WithdrawalProps) => <Withdrawal {...props} />,
};
