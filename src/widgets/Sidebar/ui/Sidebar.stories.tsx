import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator, TranslationDecorator, ContentPageDecorator } from 'shared/config/storybook';
import { Theme } from 'shared/config/theme';
import { Sidebar } from './Sidebar';

export default {
  title: 'widgets/Sidebar',
  component: Sidebar,
  decorators: [TranslationDecorator, ContentPageDecorator],
} as ComponentMeta<typeof Sidebar>;

const Template: ComponentStory<typeof Sidebar> = (args) => <Sidebar {...args} />;

export const Normal = Template.bind({});

export const Dark = Template.bind({});
Dark.decorators = [ThemeDecorator(Theme.DARK)];
