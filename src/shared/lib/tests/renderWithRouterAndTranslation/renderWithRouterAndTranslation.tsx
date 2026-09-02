import { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18nForTests from 'shared/config/language/i18nForTests';

// Opt-in helper for components that need both a Router (e.g. AppLink) and translations
// at once, so call sites don't repeat the same two-provider composition by hand.
export function renderWithRouterAndTranslation(component: ReactNode) {
  return render(
    <MemoryRouter>
      <I18nextProvider i18n={i18nForTests}>{component}</I18nextProvider>
    </MemoryRouter>,
  );
}
