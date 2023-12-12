import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import FormControl, { IFormControl } from './FormControl';
import { mockProps } from './FormControl.mocks';

export default {
  title: 'components/Form/FormControl',
  component: FormControl,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof FormControl>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof FormControl> = (args) => <FormControl {...args} />;

export const _FormControl = Template.bind({});
_FormControl.args = {
  ...mockProps.base,
} as IFormControl;
