import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { StoreDecorator, TranslationDecorator } from 'shared/config/storybook';
import { LoginForm } from './LoginForm';

export default {
  title: 'features/LoginForm',
  component: LoginForm,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof LoginForm>;

const Template: ComponentStory<typeof LoginForm> = (args) => <LoginForm {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
Primary.decorators = [TranslationDecorator, StoreDecorator({})];

export const WithError = Template.bind({});
WithError.args = {};
WithError.decorators = [TranslationDecorator, StoreDecorator({ loginForm: { error: 'error message' } })];

export const Loading = Template.bind({});
Loading.args = {};
Loading.decorators = [TranslationDecorator, StoreDecorator({ loginForm: { isLoading: true } })];
