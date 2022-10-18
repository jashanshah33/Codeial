import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import { App } from './components';
import { ToastProvider } from 'react-toast-notifications';
import { AuthProvider, PostProvider } from './providers';

const root = createRoot(  document.getElementById('root'))

root.render(
  <ToastProvider
    autoDismiss={true}
    autoDismissTimeout={5000}
    placement="top-right"
  >
    <AuthProvider>
      <PostProvider>
        <App />
      </PostProvider>
    </AuthProvider>
  </ToastProvider>,

);
