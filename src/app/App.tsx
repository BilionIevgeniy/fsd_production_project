import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { Navbar } from 'widgets/Navbar';
import { Sidebar } from 'widgets/Sidebar';
import { AppRouter } from './providers/router';
import './styles/index.scss';
import { Loader } from 'shared/ui';

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <div>
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
