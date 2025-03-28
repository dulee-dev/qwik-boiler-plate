import type { Meta, StoryObj } from 'storybook-framework-qwik';
import { action } from '@storybook/addon-actions';
import { fn } from '@storybook/test';
import { SignUp, type SignUpProps } from '.';
import { $ } from '@builder.io/qwik';

const meta: Meta<SignUpProps> = {
  component: SignUp,
  args: {},
  argTypes: {},
};

type Story = StoryObj<SignUpProps>;

export default meta;

export const Base: Story = {
  render: (props: SignUpProps) => <SignUp {...props}>Some button</SignUp>,
};
