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
    <div className={classNames('app', {}, [theme])}>
      <Suspense fallback={<Loader />}>
        <Navbar />
        <div className="content-page">
          <Sidebar />
          <div className="page-wrapper">
            <AppRouter />
          </div>
        </div>
      </Suspense>
    </div>
  );
}

export default App;
