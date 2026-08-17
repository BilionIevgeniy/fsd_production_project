import { useCallback, useMemo, useState } from 'react';
import { Story } from '@storybook/react';
import { ThemeContext } from 'shared/config/theme/ThemeContext';
import { Theme } from 'shared/config/theme';

// For stories whose component reads the theme via useTheme() itself (e.g.
// ThemeSwitcher) rather than only being restyled by the CSS class
// ThemeDecorator applies. Keeps live state so clicking a toggle button in
// the story actually flips both the context value and the "app <theme>"
// class together — the same pairing app/providers/ThemeProvider + app/App.tsx
// do for the real app — instead of the class staying frozen at story mount.
function ThemeContextStory({ initialTheme, StoryComponent }: { initialTheme: Theme; StoryComponent: Story }) {
  const [theme, setTheme] = useState(initialTheme);
  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === Theme.DARK ? Theme.NORMAL : Theme.DARK));
  }, []);
  const contextValue = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return (
    <ThemeContext.Provider value={contextValue}>
      <div className={`app ${theme}`}>
        <StoryComponent />
      </div>
    </ThemeContext.Provider>
  );
}

export const ThemeContextDecorator = (initialTheme: Theme) => (StoryComponent: Story) => (
  <ThemeContextStory initialTheme={initialTheme} StoryComponent={StoryComponent} />
);
