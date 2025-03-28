import type { Meta, StoryObj } from 'storybook-framework-qwik';
import { action } from '@storybook/addon-actions';
import { fn } from '@storybook/test';
import { FindPwForm, type FindPwFormProps } from '.';
import { $ } from '@builder.io/qwik';

const meta: Meta<FindPwFormProps> = {
  component: FindPwForm,
  args: {},
  argTypes: {},
};

type Story = StoryObj<FindPwFormProps>;

export default meta;

export const Base: Story = {
  render: (props: FindPwFormProps) => <FindPwForm {...props} />,
};
