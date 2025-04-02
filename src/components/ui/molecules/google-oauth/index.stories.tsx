import type { Meta, StoryObj } from 'storybook-framework-qwik';
import { action } from '@storybook/addon-actions';
import { fn } from '@storybook/test';
import { GoogleOauth, type GoogleOauthProps } from '.';
import { $ } from '@builder.io/qwik';

const meta: Meta<GoogleOauthProps> = {
  component: GoogleOauth,
  args: {},
  argTypes: {},
};

type Story = StoryObj<GoogleOauthProps>;

export default meta;

export const Base: Story = {
  render: (props: GoogleOauthProps) => <GoogleOauth {...props}>Some button</GoogleOauth>,
};
