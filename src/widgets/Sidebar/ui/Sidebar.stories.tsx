import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TranslationDecorator, ContentPageDecorator } from 'shared/config/storybook';
import { Theme } from 'shared/config/theme';
import { Sidebar } from './Sidebar';

export default {
  title: 'widgets/Sidebar',
  component: Sidebar,
  decorators: [TranslationDecorator],
} as ComponentMeta<typeof Sidebar>;

const Template: ComponentStory<typeof Sidebar> = (args) => <Sidebar {...args} />;

export const Normal = Template.bind({});
Normal.decorators = [ContentPageDecorator(Theme.NORMAL)];

export const Dark = Template.bind({});
Dark.decorators = [ContentPageDecorator(Theme.DARK)];
