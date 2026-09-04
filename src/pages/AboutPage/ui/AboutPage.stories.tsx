import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeContextDecorator, TranslationDecorator } from 'shared/config/storybook';
import { Theme } from 'shared/config/theme';
import AboutPage from './AboutPage';

export default {
  title: 'pages/AboutPage',
  component: AboutPage,
  decorators: [TranslationDecorator],
} as ComponentMeta<typeof AboutPage>;

const Template: ComponentStory<typeof AboutPage> = () => <AboutPage />;

export const Normal = Template.bind({});

export const Dark = Template.bind({});
Dark.decorators = [ThemeContextDecorator(Theme.DARK)];
