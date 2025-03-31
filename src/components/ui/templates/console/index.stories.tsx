import type { Meta, StoryObj } from 'storybook-framework-qwik';
import { action } from '@storybook/addon-actions';
import { fn } from '@storybook/test';
import { Console, type ConsoleProps } from '.';
import { $ } from '@builder.io/qwik';

const meta: Meta<ConsoleProps> = {
  component: Console,
  args: {},
  argTypes: {},
};

type Story = StoryObj<ConsoleProps>;

export default meta;

export const Base: Story = {
  render: (props: ConsoleProps) => <Console {...props}>Some button</Console>,
};
