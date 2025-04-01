import type { Meta, StoryObj } from 'storybook-framework-qwik';
import { action } from '@storybook/addon-actions';
import { fn } from '@storybook/test';
import { ConsoleImage, type ConsoleImageProps } from '.';
import { $ } from '@builder.io/qwik';

const meta: Meta<ConsoleImageProps> = {
  component: ConsoleImage,
  args: {},
  argTypes: {},
};

type Story = StoryObj<ConsoleImageProps>;

export default meta;

export const Base: Story = {
  render: (props: ConsoleImageProps) => <ConsoleImage {...props} />,
};
