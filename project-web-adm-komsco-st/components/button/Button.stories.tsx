import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import Button, { IButton } from './Button';
import { mockProps } from './Button.mocks';

export default {
  title: 'components/Button',
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Button>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const _Button = Template.bind({});
_Button.args = {
  ...mockProps.base,
} as IButton;
