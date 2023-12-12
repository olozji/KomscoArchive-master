import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import AuthLayout, { IAuthLayout } from './AuthLayout';
import { mockProps } from './AuthLayout.mocks';

export default {
  title: 'layout/AuthLayout',
  component: AuthLayout,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof AuthLayout>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof AuthLayout> = (args) => <AuthLayout {...args} />;

export const _AuthLayout = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

_AuthLayout.args = {
  ...mockProps.base,
} as IAuthLayout;
