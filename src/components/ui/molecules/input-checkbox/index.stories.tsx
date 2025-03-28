import type { Meta, StoryObj } from 'storybook-framework-qwik';
import { action } from '@storybook/addon-actions';
import { fn } from '@storybook/test';
import { InputCheckbox, type InputCheckboxProps } from '.';
import { $, component$, useSignal } from '@builder.io/qwik';

const meta: Meta<InputCheckboxProps> = {
  component: InputCheckbox,
  args: {
    label: '동의하기',
    name: 'agree',
    id: 'agree',
  },
  argTypes: {},
};

type Story = StoryObj<InputCheckboxProps>;

export default meta;

const Test = component$((props: Omit<InputCheckboxProps, 'bindChecked'>) => {
  const bindChecked = useSignal(false);
  return <InputCheckbox {...props} bindChecked={bindChecked} />;
});

export const Base: Story = {
  render: (props: InputCheckboxProps) => <Test {...props} />,
};
