import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StoreDecorator, TranslationDecorator } from 'shared/config/storybook';
import { ReducersList } from 'shared/lib/components/DynamicModuleLoader';
import LoginForm from './LoginForm';
import { loginReducer } from '../../model/slice/loginSlice';

const defaultAsyncReducers: ReducersList = {
  loginForm: loginReducer,
};

export default {
  title: 'features/AuthByUsername/LoginForm',
  component: LoginForm,
  decorators: [TranslationDecorator],
} as ComponentMeta<typeof LoginForm>;

const Template: ComponentStory<typeof LoginForm> = (args) => <LoginForm {...args} />;

export const Primary = Template.bind({});
Primary.decorators = [StoreDecorator({})];

export const WithError = Template.bind({});
WithError.decorators = [
  StoreDecorator({ loginForm: { error: 'error text' } }, defaultAsyncReducers),
];
