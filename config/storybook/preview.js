import { addDecorator } from '@storybook/react';
import { StyleDecorator, RouterDecorator, ThemeContextDecorator } from '../../src/shared/config/storybook';
import { Theme } from '../../src/shared/config/theme';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

// These decorators are applied to every story.
addDecorator(StyleDecorator);
addDecorator(RouterDecorator);
addDecorator(ThemeContextDecorator(Theme.NORMAL));
