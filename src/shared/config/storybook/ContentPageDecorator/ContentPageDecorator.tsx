import { Story } from '@storybook/react';
import { AppThemeRoot } from 'shared/config/storybook/AppThemeRoot/AppThemeRoot';
import { Theme } from 'shared/config/theme';

// Reproduces the `app/App.tsx` structure Sidebar is normally rendered into:
// a themed root (AppThemeRoot) around the `.content-page` flex row. Sidebar's
// CSS sets `height: 100%`, which only resolves against an ancestor with a
// *definite* height — `.content-page` sets an explicit `height: calc(...)`,
// while AppThemeRoot's own div sets no height at all, which doesn't count
// for that purpose. Bundled with the theme (rather than composed with a
// separate ThemeContextDecorator override) so a per-story theme override can
// never land *between* `.content-page` and Sidebar: Storybook always nests
// meta-level decorators (this one, applied for every story in a file)
// outside story-level ones, so a plain `ThemeContextDecorator(theme)` override on
// one story would become Sidebar's *direct* parent instead of a sibling of
// `.content-page` — and being a lone, non-flex-stretched div, it wouldn't
// have a definite height either, so `height: 100%` would collapse again.
export const ContentPageDecorator = (theme: Theme) => (StoryComponent: Story) => (
  <AppThemeRoot theme={theme}>
    <div className="content-page">
      <StoryComponent />
    </div>
  </AppThemeRoot>
);
