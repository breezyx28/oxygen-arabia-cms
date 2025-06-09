import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import App from './app';
import { Providers } from './redux/provider';
import { ToastProvider } from './context/ToastContext';

// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <HelmetProvider>
    <BrowserRouter>
      <Suspense>
        <ToastProvider>
          <Providers>
            <App />
          </Providers>
        </ToastProvider>
      </Suspense>
    </BrowserRouter>
  </HelmetProvider>
);
