import type { Meta, StoryObj } from 'storybook-framework-qwik';
import { action } from '@storybook/addon-actions';
import { fn } from '@storybook/test';
import { FloatingBtn, type FloatingBtnProps } from '.';
import { $ } from '@builder.io/qwik';

const meta: Meta<FloatingBtnProps> = {
  component: FloatingBtn,
  args: {},
  argTypes: {},
};

type Story = StoryObj<FloatingBtnProps>;

export default meta;

export const Base: Story = {
  render: (props: FloatingBtnProps) => (
    <FloatingBtn {...props}>Some button</FloatingBtn>
  ),
};
