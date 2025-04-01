import type { Meta, StoryObj } from 'storybook-framework-qwik';
import { action } from '@storybook/addon-actions';
import { fn } from '@storybook/test';
import { FindPw, type FindPwProps } from '.';
import { $ } from '@builder.io/qwik';

const meta: Meta<FindPwProps> = {
  component: FindPw,
  args: {},
  argTypes: {},
};

type Story = StoryObj<FindPwProps>;

export default meta;

export const Base: Story = {
  render: (props: FindPwProps) => <FindPw {...props} />,
};
