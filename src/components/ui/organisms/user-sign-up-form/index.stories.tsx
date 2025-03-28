import type { Meta, StoryObj } from 'storybook-framework-qwik';
import { action } from '@storybook/addon-actions';
import { fn } from '@storybook/test';
import { UserSignUpForm, type UserSignUpFormProps } from '.';
import { $ } from '@builder.io/qwik';

const meta: Meta<UserSignUpFormProps> = {
  component: UserSignUpForm,
  args: {},
  argTypes: {},
};

type Story = StoryObj<UserSignUpFormProps>;

export default meta;

export const Base: Story = {
  render: (props: UserSignUpFormProps) => <UserSignUpForm {...props} />,
};
