import { Routes, Route } from 'react-router-dom';
import { routeConfig } from '../config/routeConfig';

function AppRouter() {
  return (
    <Routes>
      {routeConfig.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
}
export { AppRouter };
