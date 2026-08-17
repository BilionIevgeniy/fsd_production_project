import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeContextDecorator } from 'shared/config/storybook';
import { Theme } from 'shared/config/theme';
import { ThemeSwitcher } from './ThemeSwitcher';

export default {
  title: 'features/ThemeSwitcher',
  component: ThemeSwitcher,
} as ComponentMeta<typeof ThemeSwitcher>;

const Template: ComponentStory<typeof ThemeSwitcher> = (args) => <ThemeSwitcher {...args} />;

// Click the button in the canvas — ThemeContextDecorator keeps live state,
// so it actually toggles between the two themes, icon and background alike.
export const Normal = Template.bind({});
Normal.decorators = [ThemeContextDecorator(Theme.NORMAL)];

export const Dark = Template.bind({});
Dark.decorators = [ThemeContextDecorator(Theme.DARK)];
