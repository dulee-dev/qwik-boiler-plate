import type { Meta, StoryObj } from 'storybook-framework-qwik';
import { action } from '@storybook/addon-actions';
import { fn } from '@storybook/test';
import { __Name__, type __Name__Props } from '.';
import { $ } from '@builder.io/qwik';

const meta: Meta<__Name__Props> = {
  component: __Name__,
  args: {},
  argTypes: {},
};

type Story = StoryObj<__Name__Props>;

export default meta;

export const Base: Story = {
  render: (props: __Name__Props) => <__Name__ {...props}>Some button</__Name__>,
};
