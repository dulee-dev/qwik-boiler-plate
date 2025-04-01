import type { Meta, StoryObj } from 'storybook-framework-qwik';
import { action } from '@storybook/addon-actions';
import { fn } from '@storybook/test';
import { ConsoleFile, type ConsoleFileProps } from '.';
import { $ } from '@builder.io/qwik';

const meta: Meta<ConsoleFileProps> = {
  component: ConsoleFile,
  args: {},
  argTypes: {},
};

type Story = StoryObj<ConsoleFileProps>;

export default meta;

export const Base: Story = {
  render: (props: ConsoleFileProps) => <ConsoleFile {...props} />,
};
