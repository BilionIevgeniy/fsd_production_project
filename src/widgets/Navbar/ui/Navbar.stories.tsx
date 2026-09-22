import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StoreDecorator, ThemeContextDecorator, TranslationDecorator } from 'shared/config/storybook';
import { Theme } from 'shared/config/theme';
import { Navbar } from './Navbar';

export default {
  title: 'widgets/Navbar',
  component: Navbar,
  decorators: [TranslationDecorator],
} as ComponentMeta<typeof Navbar>;

const Template: ComponentStory<typeof Navbar> = (args) => <Navbar {...args} />;

export const Normal = Template.bind({});
Normal.decorators = [StoreDecorator({})];

export const Dark = Template.bind({});
Dark.decorators = [StoreDecorator({}), ThemeContextDecorator(Theme.DARK)];

export const Authorized = Template.bind({});
Authorized.decorators = [StoreDecorator({ user: { authData: { id: '1', username: 'admin' } } })];
