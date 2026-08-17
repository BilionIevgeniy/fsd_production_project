import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator, TranslationDecorator, PageLayoutDecorator } from 'shared/config/storybook';
import { Theme } from 'shared/config/theme';
import { NotFoundPage } from './NotFoundPage';

export default {
  title: 'pages/NotFoundPage',
  component: NotFoundPage,
  decorators: [TranslationDecorator, PageLayoutDecorator],
} as ComponentMeta<typeof NotFoundPage>;

const Template: ComponentStory<typeof NotFoundPage> = (args) => <NotFoundPage {...args} />;

export const Normal = Template.bind({});

export const Dark = Template.bind({});
Dark.decorators = [ThemeDecorator(Theme.DARK)];
