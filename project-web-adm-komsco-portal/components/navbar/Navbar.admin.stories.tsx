import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import NavbarAdmin, { INavbarAdmin } from './Navbar.admin';
import { adminProps } from './Navbar.admin.mocks';

export default {
  title: 'components/NavbarAdmin',
  component: NavbarAdmin,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof NavbarAdmin>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof NavbarAdmin> = (args) => <NavbarAdmin {...args} />;

export const _NavbarAdmin = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

_NavbarAdmin.args = {
  ...adminProps.base,
} as INavbarAdmin;
