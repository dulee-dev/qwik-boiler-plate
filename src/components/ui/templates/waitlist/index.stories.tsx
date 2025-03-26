import type { Meta, StoryObj } from 'storybook-framework-qwik';
import { action } from '@storybook/addon-actions';
import { fn } from '@storybook/test';
import { Waitlist, type WaitlistProps } from '.';
import { $ } from '@builder.io/qwik';

const meta: Meta<WaitlistProps> = {
  component: Waitlist,
  args: {},
  argTypes: {},
};

type Story = StoryObj<WaitlistProps>;

export default meta;

export const Base: Story = {
  render: (props: WaitlistProps) => <Waitlist {...props}>Some button</Waitlist>,
};
