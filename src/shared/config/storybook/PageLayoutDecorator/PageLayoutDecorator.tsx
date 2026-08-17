import { Story } from '@storybook/react';

// Reproduces the `.content-page > .page-wrapper` structure app/App.tsx
// renders routed pages into. Same reasoning as ContentPageDecorator: pages
// like NotFoundPage set `height: 100%`, which needs `.page-wrapper` to have
// an actual computed height — here that comes from `.content-page`'s flex
// row stretching its `.page-wrapper` child to match its own explicit height.
export const PageLayoutDecorator = (StoryComponent: Story) => (
  <div className="content-page">
    <div className="page-wrapper">
      <StoryComponent />
    </div>
  </div>
);
