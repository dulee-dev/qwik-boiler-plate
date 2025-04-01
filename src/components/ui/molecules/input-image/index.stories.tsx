import type { Meta, StoryObj } from 'storybook-framework-qwik';
import { action } from '@storybook/addon-actions';
import { fn } from '@storybook/test';
import { InputImage, type InputImageProps } from '.';
import { $ } from '@builder.io/qwik';

const meta: Meta<InputImageProps> = {
  component: InputImage,
  args: {},
  argTypes: {},
};

type Story = StoryObj<InputImageProps>;

export default meta;

export const Base: Story = {
  render: (props: InputImageProps) => <InputImage {...props}>Some button</InputImage>,
};
