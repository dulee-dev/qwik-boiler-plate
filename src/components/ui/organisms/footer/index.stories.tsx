import type { Meta, StoryObj } from 'storybook-framework-qwik';
import { action } from '@storybook/addon-actions';
import { fn } from '@storybook/test';
import { Footer, type FooterProps } from '.';
import { $ } from '@builder.io/qwik';

const meta: Meta<FooterProps> = {
  component: Footer,
  args: {},
  argTypes: {},
};

type Story = StoryObj<FooterProps>;

export default meta;

export const Base: Story = {
  render: (props: FooterProps) => <Footer {...props}>Some button</Footer>,
};
