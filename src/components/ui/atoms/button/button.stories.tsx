import type { Meta, StoryObj } from 'storybook-framework-qwik';
import { action } from '@storybook/addon-actions';
import { fn } from '@storybook/test';
import { Button, type ButtonProps } from './button';
import { $ } from '@builder.io/qwik';

const meta: Meta<ButtonProps> = {
  component: Button,
  args: {
    text: 'medium',
    onClick$: $(fn(action('onClick'))),
  },
  argTypes: {},
};

type Story = StoryObj<ButtonProps>;

export default meta;

export const Base: Story = {
  render: (props: ButtonProps) => <Button {...props}>Some button</Button>,
};
