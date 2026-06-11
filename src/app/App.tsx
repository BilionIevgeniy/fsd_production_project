import { Suspense } from 'react';
import { useTheme } from 'shared/config/theme';
import { classNames } from 'shared/lib/classNames';
import { Loader } from '../shared/ui';
import { Navbar } from '../widgets/Navbar';
import { Sidebar } from '../widgets/Sidebar';
import { AppRouter } from './providers/RouterProvider';
import './styles/index.scss';

function App() {
  const { theme } = useTheme();
  return (
    <Suspense fallback={<Loader />}>
      <div className={classNames('app', {}, [theme])}>
        <Navbar />
        <div className="content-page">
          <Sidebar />
          <div className="page-wrapper">
            <AppRouter />
          </div>
        </div>
      </div>
    </Suspense>
  );
}

export default App;
