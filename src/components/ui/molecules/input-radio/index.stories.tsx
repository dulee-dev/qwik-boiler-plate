import type { Meta, StoryObj } from 'storybook-framework-qwik';
import { action } from '@storybook/addon-actions';
import { fn } from '@storybook/test';
import { InputRadio, type InputRadioProps } from '.';
import { $, component$, useSignal } from '@builder.io/qwik';

const meta: Meta<InputRadioProps> = {
  component: InputRadio,
  args: {
    label: '동의하기',
    name: 'agree',
    id: 'agree',
  },
  argTypes: {},
};

type Story = StoryObj<InputRadioProps>;

export default meta;

const Test = component$((props: Omit<InputRadioProps, 'bindValue'>) => {
  const bindValue = useSignal('string');
  return <InputRadio {...props} bindValue={bindValue} />;
});

export const Base: Story = {
  render: (props: InputRadioProps) => <Test {...props} />,
};
