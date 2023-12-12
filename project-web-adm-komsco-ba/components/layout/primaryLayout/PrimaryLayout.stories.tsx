import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import PrimaryLayout, { IPrimaryLayout } from './PrimaryLayout';
import { mockProps } from './PrimaryLayout.mocks';

export default {
  title: 'layout/PrimaryLayout',
  component: PrimaryLayout,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof PrimaryLayout>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof PrimaryLayout> = (args) => <PrimaryLayout {...args} />;

export const _PrimaryLayout = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

_PrimaryLayout.args = {
  ...mockProps.base,
} as IPrimaryLayout;
