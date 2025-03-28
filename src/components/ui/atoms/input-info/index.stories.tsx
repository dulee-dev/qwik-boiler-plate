import type { Meta, StoryObj } from 'storybook-framework-qwik';
import { action } from '@storybook/addon-actions';
import { fn } from '@storybook/test';
import { InputInfo, type InputInfoProps } from '.';
import { $ } from '@builder.io/qwik';

const meta: Meta<InputInfoProps> = {
  component: InputInfo,
  args: {},
  argTypes: {},
};

type Story = StoryObj<InputInfoProps>;

export default meta;

export const Base: Story = {
  render: (props: InputInfoProps) => <InputInfo {...props}>Some button</InputInfo>,
};
