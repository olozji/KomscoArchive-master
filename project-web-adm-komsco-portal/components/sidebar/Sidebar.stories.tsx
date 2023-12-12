import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import Sidebar, { ISidebar } from './Sidebar';
import { mockProps } from './Sidebar.mocks';

export default {
  title: 'components/Sidebar',
  component: Sidebar,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Sidebar>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Sidebar> = (args) => <Sidebar {...args} />;

export const _Sidebar = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

_Sidebar.args = {
  ...mockProps.base,
} as ISidebar;
