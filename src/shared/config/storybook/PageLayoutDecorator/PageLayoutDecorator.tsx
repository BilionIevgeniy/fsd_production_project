import { Story } from '@storybook/react';
import { Theme } from 'shared/config/theme';

// Reproduces the `.app <theme> > .content-page > .page-wrapper` structure
// app/App.tsx renders routed pages into. Same reasoning as
// ContentPageDecorator, one level deeper: pages like NotFoundPage set
// `height: 100%`, which needs `.page-wrapper` to have an actual computed
// height — here that comes from `.content-page`'s flex row stretching its
// direct child `.page-wrapper` to match its own explicit height. That
// stretch only applies to a flex *container's direct children*, so the
// theme has to be bundled into this same wrapper rather than composed via a
// separate story-level ThemeDecorator: an override applied that way would
// insert an extra, non-flex-stretched `.app` div *between* `.page-wrapper`
// and the page — which, having no definite height itself, breaks the same
// chain one level down and collapses the page back to its content height.
export const PageLayoutDecorator = (theme: Theme) => (StoryComponent: Story) => (
  <div className={`app ${theme}`}>
    <div className="content-page">
      <div className="page-wrapper">
        <StoryComponent />
      </div>
    </div>
  </div>
);
