import type { Meta, StoryObj } from 'storybook-framework-qwik';
import { action } from '@storybook/addon-actions';
import { fn } from '@storybook/test';
import { InputRadioOthers, type InputRadioOthersProps } from '.';
import { $ } from '@builder.io/qwik';

const meta: Meta<InputRadioOthersProps> = {
  component: InputRadioOthers,
  args: {},
  argTypes: {},
};

type Story = StoryObj<InputRadioOthersProps>;

export default meta;

export const Base: Story = {
  render: (props: InputRadioOthersProps) => <InputRadioOthers {...props}>Some button</InputRadioOthers>,
};
