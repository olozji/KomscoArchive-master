import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import BaseTable, { ITable } from './Table';
import { mockProps } from './Table.mocks';

export default {
  title: 'components/Table',
  component: BaseTable,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof BaseTable>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof BaseTable> = (args) => <BaseTable {...args} />;

export const _Table = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

_Table.args = {
  ...mockProps.base,
} as ITable;
