import type { Meta, StoryObj } from 'storybook-framework-qwik';
import { action } from '@storybook/addon-actions';
import { fn } from '@storybook/test';
import { Submit, type SubmitProps } from '.';
import { $ } from '@builder.io/qwik';

const meta: Meta<SubmitProps> = {
  component: Submit,
  args: {},
  argTypes: {},
};

type Story = StoryObj<SubmitProps>;

export default meta;

export const Base: Story = {
  render: (props: SubmitProps) => <Submit {...props}>Some button</Submit>,
};
