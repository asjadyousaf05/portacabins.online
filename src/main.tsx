import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './global.css';

const container = document.getElementById('app');

if (container) {
  ReactDOM.createRoot(container).render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );
}
