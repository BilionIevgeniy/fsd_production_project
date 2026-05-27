import { render } from 'react-dom';
import App from './app/App';

render(
  //   <BrowserRouter
  //     future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
  //   >
  <App />,
  //   </BrowserRouter>
  document.getElementById('root'),
);
