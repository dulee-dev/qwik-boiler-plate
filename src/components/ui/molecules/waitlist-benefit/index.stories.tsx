import type { Meta, StoryObj } from 'storybook-framework-qwik';
import { action } from '@storybook/addon-actions';
import { fn } from '@storybook/test';
import { WaitlistBenefit, type WaitlistBenefitProps } from '.';
import { $ } from '@builder.io/qwik';

const meta: Meta<WaitlistBenefitProps> = {
  component: WaitlistBenefit,
  args: {
    content: 'test',
  },
  argTypes: {},
};

type Story = StoryObj<WaitlistBenefitProps>;

export default meta;

export const Base: Story = {
  render: (props: WaitlistBenefitProps) => (
    <WaitlistBenefit {...props}>Some button</WaitlistBenefit>
  ),
};
