import type { Meta, StoryObj } from 'storybook-framework-qwik';
import { action } from '@storybook/addon-actions';
import { fn } from '@storybook/test';
import { InputText, type InputTextProps } from '.';
import { $ } from '@builder.io/qwik';

const meta: Meta<InputTextProps> = {
  component: InputText,
  args: {
    name: 'email',
    id: 'email',
    value: '',
    placeholder: 'dulee@dev.com',
  },
  argTypes: {},
};

type Story = StoryObj<InputTextProps>;

export default meta;

export const Base: Story = {
  render: (props: InputTextProps) => (
    <InputText {...props}>Some button</InputText>
  ),
};
