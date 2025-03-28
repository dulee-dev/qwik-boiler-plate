import type { Meta, StoryObj } from 'storybook-framework-qwik';
import { action } from '@storybook/addon-actions';
import { fn } from '@storybook/test';
import { InputTextVerbose, type InputTextVerboseProps } from '.';
import { $ } from '@builder.io/qwik';

const meta: Meta<InputTextVerboseProps> = {
  component: InputTextVerbose,
  args: {
    label: 'email',
    name: 'email',
    id: 'email',
    value: '',
    type: 'email',
    placeholder: 'dulee.dev@gmail.com',
    info: {
      type: 'ok',
      text: 'ok',
    },
  },

  argTypes: {
    info: {
      control: 'radio',
      options: ['undefined', 'ok', 'error', 'desc'],
      mapping: {
        undefined: undefined,
        ok: {
          type: 'ok',
          text: 'ok',
        },
        error: {
          type: 'error',
          text: 'error',
        },
        desc: {
          type: 'desc',
          text: 'desc',
        },
      },
    },
  },
};

type Story = StoryObj<InputTextVerboseProps>;

export default meta;

export const Base: Story = {
  render: (props: InputTextVerboseProps) => <InputTextVerbose {...props} />,
};
