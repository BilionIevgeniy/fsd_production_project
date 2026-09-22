import { useDispatch } from 'react-redux';
import { userActions } from 'entities/User';
import { Suspense, useEffect } from 'react';
import { Loader } from '../shared/ui';
import { Navbar } from '../widgets/Navbar';
import { Sidebar } from '../widgets/Sidebar';
import { AppRouter } from './providers/RouterProvider';
import './styles/index.scss';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userActions.initAuthData());
  }, [dispatch]);
  return (
    <Suspense fallback={<Loader />}>
      <Navbar />
      <div className="content-page">
        <Sidebar />
        <div className="page-wrapper">
          <AppRouter />
        </div>
      </div>
    </Suspense>
  );
}

export default App;
