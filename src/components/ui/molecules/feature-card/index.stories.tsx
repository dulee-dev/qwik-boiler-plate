import type { Meta, StoryObj } from 'storybook-framework-qwik';
import { action } from '@storybook/addon-actions';
import { fn } from '@storybook/test';
import { FeatureCard, type FeatureCardProps } from '.';
import { $ } from '@builder.io/qwik';

const meta: Meta<FeatureCardProps> = {
  component: FeatureCard,
  args: {},
  argTypes: {},
};

type Story = StoryObj<FeatureCardProps>;

export default meta;

export const Base: Story = {
  render: (props: FeatureCardProps) => (
    <FeatureCard {...props}>Some button</FeatureCard>
  ),
};
