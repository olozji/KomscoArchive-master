import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import FormSelect, { IFormSelect } from './FormSelect';
import { mockProps } from './FormSelect.mocks';

export default {
  title: 'components/Form/FormSelect',
  component: FormSelect,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof FormSelect>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof FormSelect> = (args) => <FormSelect {...args} />;

export const _FormSelect = Template.bind({});
_FormSelect.args = {
  ...mockProps.base,
} as IFormSelect;
