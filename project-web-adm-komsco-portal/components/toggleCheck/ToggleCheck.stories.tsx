import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import ToggleCheck, { IToggleCheck } from './ToggleCheck';
import { mockToggleCheckProps } from './ToggleCheck.mocks';

export default {
  title: 'components/ToggleCheck',
  component: ToggleCheck,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof ToggleCheck>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ToggleCheck> = (args) => <ToggleCheck {...args} />;

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {};
