import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import PrimaryLayoutAdmin, { IPrimaryLayoutAdmin } from './PrimaryLayoutAdmin';
import { adminProps } from './PrimaryLayout.Admin.mocks';

export default {
  title: 'layout/PrimaryLayoutAdmin',
  component: PrimaryLayoutAdmin,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof PrimaryLayoutAdmin>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof PrimaryLayoutAdmin> = (args) => (
  <PrimaryLayoutAdmin {...args} />
);

export const _PrimaryLayoutAdmin = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

_PrimaryLayoutAdmin.args = {
  ...adminProps.base,
} as IPrimaryLayoutAdmin;
