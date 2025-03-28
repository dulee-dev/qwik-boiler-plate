import type { Meta, StoryObj } from 'storybook-framework-qwik';
import { action } from '@storybook/addon-actions';
import { fn } from '@storybook/test';
import { SignIn, type SignInProps } from '.';
import { $ } from '@builder.io/qwik';

const meta: Meta<SignInProps> = {
  component: SignIn,
  args: {},
  argTypes: {},
};

type Story = StoryObj<SignInProps>;

export default meta;

export const Base: Story = {
  render: (props: SignInProps) => <SignIn {...props}>Some button</SignIn>,
};
