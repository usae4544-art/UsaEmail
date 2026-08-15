window.addEventListener('error', (e) => {
  if (e.message && e.message.trim() === 'Uncaught') return; // Ignore empty uncaught artifacts
  console.error("Global Error Caught:", e.message || e);
});
window.addEventListener('unhandledrejection', (e) => {
  if(e.reason) console.error("Global Promise Rejection Caught:", e.reason);
});

import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import ErrorBoundary from './ErrorBoundary.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
