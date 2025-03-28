import type { Meta, StoryObj } from 'storybook-framework-qwik';
import { action } from '@storybook/addon-actions';
import { fn } from '@storybook/test';
import { InputPassword, type InputPasswordProps } from '.';
import { $ } from '@builder.io/qwik';

const meta: Meta<InputPasswordProps> = {
  component: InputPassword,
  args: {
    label: 'email',
    name: 'email',
    id: 'email',
    value: '',
    type: 'email',
    placeholder: 'dulee.dev@gmail.com',
  },
  argTypes: {},
};

type Story = StoryObj<InputPasswordProps>;

export default meta;

export const Base: Story = {
  render: (props: InputPasswordProps) => <InputPassword {...props} />,
};
