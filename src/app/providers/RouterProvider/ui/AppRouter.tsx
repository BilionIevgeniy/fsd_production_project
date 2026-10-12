import { getUserAuthData } from 'entities/User';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { routeConfig } from '../config/routeConfig';

function AppRouter() {
  const isAuth = useSelector(getUserAuthData);
  const routes = Object.values(routeConfig).filter((route) => {
    if (route.authOnly && !isAuth) {
      return false;
    }
    return true;
  });
  return (
    <Routes>
      {routes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
}
export default memo(AppRouter);
