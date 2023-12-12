import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import Navbar, { INavbar } from './Navbar';
import { mockProps } from './Navbar.mocks';

export default {
  title: 'components/Navbar',
  component: Navbar,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Navbar>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Navbar> = (args) => <Navbar {...args} />;

export const _Navbar = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

_Navbar.args = {
  ...mockProps.base,
} as INavbar;
