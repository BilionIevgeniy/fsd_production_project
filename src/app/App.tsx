import { Suspense, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Navbar } from '../widgets/Navbar';
import { Sidebar } from '../widgets/Sidebar';
import { AppRouter } from './providers/RouterProvider';
import './styles/index.scss';

import { Loader } from '../shared/ui';
import { useTheme } from '@/shared/config/theme/useTheme';

function App() {
  const { theme, toggleTheme } = useTheme();
  return (
    <Suspense fallback={<Loader />}>
      <div className={`app ${theme}`}>
        <button onClick={toggleTheme}> Switch Theme</button>
        <Navbar />
        <div className="content-page">
          <Sidebar children="Mksdfsdfd" />
          <AppRouter />
        </div>
      </div>
    </Suspense>
  );
}

export default App;
