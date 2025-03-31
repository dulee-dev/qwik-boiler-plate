import type { Meta, StoryObj } from 'storybook-framework-qwik';
import { action } from '@storybook/addon-actions';
import { fn } from '@storybook/test';
import { UserSignInForm, type UserSignInFormProps } from '.';
import { $ } from '@builder.io/qwik';

const meta: Meta<UserSignInFormProps> = {
  component: UserSignInForm,
  args: {},
  argTypes: {},
};

type Story = StoryObj<UserSignInFormProps>;

export default meta;

export const Base: Story = {
  render: (props: UserSignInFormProps) => <UserSignInForm {...props} />,
};
