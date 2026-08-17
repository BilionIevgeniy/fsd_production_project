import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { RouterDecorator } from 'shared/config/storybook/RouterDecorator/RouterDecorator';
import { Theme } from 'shared/config/theme';
import { AppLink, AppLinkTheme } from './AppLink';

export default {
  title: 'shared/AppLink',
  component: AppLink,
  decorators: [RouterDecorator],
} as ComponentMeta<typeof AppLink>;

const Template: ComponentStory<typeof AppLink> = (args) => <AppLink {...args} />;

export const PrimaryNormal = Template.bind({});
PrimaryNormal.args = {
  children: 'Link',
  to: '/',
  theme: AppLinkTheme.PRIMARY,
};

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
  children: 'Link',
  to: '/',
  theme: AppLinkTheme.PRIMARY,
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];

export const InvertedNormal = Template.bind({});
InvertedNormal.args = {
  children: 'Link',
  to: '/',
  theme: AppLinkTheme.INVERTED,
};

export const InvertedDark = Template.bind({});
InvertedDark.args = {
  children: 'Link',
  to: '/',
  theme: AppLinkTheme.INVERTED,
};
InvertedDark.decorators = [ThemeDecorator(Theme.DARK)];
