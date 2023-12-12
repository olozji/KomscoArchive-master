import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import FormCheck, { IFormCheck } from './FormCheck';
import { mockProps } from './FormCheck.mocks';

export default {
  title: 'components/Form/FormCheck',
  component: FormCheck,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof FormCheck>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof FormCheck> = (args) => <FormCheck {...args} />;

export const _FormCheck = Template.bind({});
_FormCheck.args = {
  ...mockProps.base,
} as IFormCheck;
