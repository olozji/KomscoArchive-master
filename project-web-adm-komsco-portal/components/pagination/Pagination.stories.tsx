import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import Pagination, { IPagination } from './Pagination';
import { mockProps } from './Pagination.mocks';

export default {
  title: 'components/Pagination',
  component: Pagination,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Pagination>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Pagination> = (args) => <Pagination {...args} />;

export const _Pagination = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

_Pagination.args = {
  ...mockProps.base,
} as IPagination;
