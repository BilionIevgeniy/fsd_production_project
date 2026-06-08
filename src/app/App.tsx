import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { Navbar } from '../widgets/Navbar';
import { Sidebar } from '../widgets/Sidebar';
import { AppRouter } from './providers/RouterProvider';
import './styles/index.scss';

import { Loader } from '../shared/ui';
import { useTheme } from 'shared/config/theme/useTheme';
import { classNames } from 'shared/lib/classNames';

function App() {
  const { theme, toggleTheme } = useTheme();
  return (
    <Suspense fallback={<Loader />}>
      <div className={classNames('app', {}, [theme])}>
        <button onClick={toggleTheme}> Switch Theme</button>
        <Navbar />
        <div className="content-page">
          <Sidebar children="" />
          <AppRouter />
        </div>
      </div>
    </Suspense>
  );
}

export default App;
