import { Story } from '@storybook/react';

// Reproduces the `.content-page` row from app/App.tsx that Sidebar is
// normally a flex child of. Sidebar's CSS sets `height: 100%`, which only
// resolves against an ancestor with a *definite* height — `.content-page`
// sets an explicit `height: calc(...)`, while ThemeDecorator's `.app` only
// sets `min-height`, which doesn't count. Without this wrapper, Sidebar's
// height computes to `auto` and it collapses to the height of its toggle
// button, with the absolutely-positioned switchers landing on top of it.
export const ContentPageDecorator = (StoryComponent: Story) => (
  <div className="content-page">
    <StoryComponent />
  </div>
);
