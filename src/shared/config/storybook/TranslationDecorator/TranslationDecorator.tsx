import { Story } from '@storybook/react';
import { I18nextProvider } from 'react-i18next';
import i18nForTests from 'shared/config/language/i18nForTests';

// Reuses the same synchronous, no-network i18n instance as
// shared/lib/tests/renderWithTranslation: stories that render translated
// components need it, but the real i18n.ts hits a backend over HTTP and
// waits on Suspense, which doesn't work in Storybook.
export const TranslationDecorator = (StoryComponent: Story) => (
  <I18nextProvider i18n={i18nForTests}>
    <StoryComponent />
  </I18nextProvider>
);
