import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './app/App';
import { ThemeProvider } from 'app/providers/ThemeProvider';
import 'shared/config/language/i18n';

render(
  <BrowserRouter
    future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
  >
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </BrowserRouter>,
  document.getElementById('root'),
);
