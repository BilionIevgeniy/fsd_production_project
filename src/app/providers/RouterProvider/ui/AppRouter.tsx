import { AboutPage } from 'pages/AboutPage';
import { MainPage } from 'pages/MainPage';
import { Routes, Route } from 'react-router-dom';

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/about" element={<AboutPage />} />
    </Routes>
  );
}
export { AppRouter };
