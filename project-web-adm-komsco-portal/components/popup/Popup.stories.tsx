import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import Popup, { IPopup } from './Popup';
import { mockProps } from './Popup.mocks';

export default {
  title: 'components/Popup',
  component: Popup,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Popup>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Popup> = (args) => <Popup {...args} />;

export const _Popup = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

_Popup.args = {
  ...mockProps.base,
} as IPopup;
