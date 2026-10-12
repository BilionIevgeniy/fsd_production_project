import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { StoreDecorator, ThemeDecorator } from 'shared/config/storybook';
import { Theme } from 'shared/config/theme';
import { Sidebar } from './Sidebar';

export default {
  title: 'widget/Sidebar',
  component: Sidebar,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Sidebar>;

const Template: ComponentStory<typeof Sidebar> = (args) => <Sidebar {...args} />;

const authorized = StoreDecorator({ user: { authData: { id: '1', username: 'admin' } } });

export const Light = Template.bind({});
Light.args = {};
Light.decorators = [authorized];

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [authorized, ThemeDecorator(Theme.DARK)];
