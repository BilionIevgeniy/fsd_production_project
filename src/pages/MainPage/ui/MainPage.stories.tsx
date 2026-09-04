import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeContextDecorator, TranslationDecorator } from 'shared/config/storybook';
import { Theme } from 'shared/config/theme';
import MainPage from './MainPage';

export default {
  title: 'pages/MainPage',
  component: MainPage,
  decorators: [TranslationDecorator],
} as ComponentMeta<typeof MainPage>;

const Template: ComponentStory<typeof MainPage> = () => <MainPage />;

export const Normal = Template.bind({});

export const Dark = Template.bind({});
Dark.decorators = [ThemeContextDecorator(Theme.DARK)];
