import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import ProfilePage from 'pages/ProfilePage/ui/ProfilePage';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { Theme } from 'shared/config/theme';
import { Country, Currency } from 'shared/const/common';
import axios from 'axios';

// Mock transport so the story doesn't hit a real server (none runs in CI)
const mockApi = axios.create({
  adapter: async (config) => ({
    data: {
      first: 'Ievgen',
      lastname: 'Bilion',
      age: 22,
      currency: Currency.EUR,
      country: Country.Ukraine,
      city: 'Bonn',
      username: 'admin',
      avatar: '',
    },
    status: 200,
    statusText: 'OK',
    headers: {},
    config,
  }),
});

export default {
  title: 'pages/ProfilePage',
  component: ProfilePage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ProfilePage>;

const Template: ComponentStory<typeof ProfilePage> = (args) => <ProfilePage {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [StoreDecorator({}, undefined, mockApi)];

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({}, undefined, mockApi)];
