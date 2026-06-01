import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './app/App';

render(
  <BrowserRouter
    future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
  >
    <App />
  </BrowserRouter>,
  document.getElementById('root'),
);
