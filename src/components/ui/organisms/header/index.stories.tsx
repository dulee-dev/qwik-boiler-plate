import type { Meta, StoryObj } from 'storybook-framework-qwik';
import { action } from '@storybook/addon-actions';
import { fn } from '@storybook/test';
import { Header, type HeaderProps } from '.';
import { $ } from '@builder.io/qwik';

const meta: Meta<HeaderProps> = {
  component: Header,
  args: {},
  argTypes: {},
};

type Story = StoryObj<HeaderProps>;

export default meta;

export const Base: Story = {
  render: (props: HeaderProps) => <Header {...props}>Some button</Header>,
};
