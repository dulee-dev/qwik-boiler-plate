import type { Meta, StoryObj } from 'storybook-framework-qwik';
import { action } from '@storybook/addon-actions';
import { fn } from '@storybook/test';
import { ConsoleUploadImage, type ConsoleUploadImageProps } from '.';
import { $ } from '@builder.io/qwik';

const meta: Meta<ConsoleUploadImageProps> = {
  component: ConsoleUploadImage,
  args: {},
  argTypes: {},
};

type Story = StoryObj<ConsoleUploadImageProps>;

export default meta;

export const Base: Story = {
  render: (props: ConsoleUploadImageProps) => <ConsoleUploadImage {...props} />,
};
