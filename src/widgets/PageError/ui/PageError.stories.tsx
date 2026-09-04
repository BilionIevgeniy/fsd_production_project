import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeContextDecorator, TranslationDecorator } from 'shared/config/storybook';
import { Theme } from 'shared/config/theme';
import { PageError } from './PageError';

export default {
  title: 'widgets/PageError',
  component: PageError,
  decorators: [TranslationDecorator],
} as ComponentMeta<typeof PageError>;

const Template: ComponentStory<typeof PageError> = (args) => <PageError {...args} />;

export const Normal = Template.bind({});

export const Dark = Template.bind({});
Dark.decorators = [ThemeContextDecorator(Theme.DARK)];
