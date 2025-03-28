import type { Meta, StoryObj } from 'storybook-framework-qwik';
import { action } from '@storybook/addon-actions';
import { fn } from '@storybook/test';
import { InputTextLabeled, type InputTextLabeledProps } from '.';
import { $ } from '@builder.io/qwik';

const meta: Meta<InputTextLabeledProps> = {
  component: InputTextLabeled,
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

type Story = StoryObj<InputTextLabeledProps>;

export default meta;

export const Base: Story = {
  render: (props: InputTextLabeledProps) => <InputTextLabeled {...props} />,
};
