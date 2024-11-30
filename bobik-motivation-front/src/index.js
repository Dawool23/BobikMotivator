import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './context/AuthContext';
/* import { DataProvider } from './context/DataContext'; */

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
{/*     <DataProvider> */}
<AuthProvider>
      <App />
</AuthProvider>
{/*     </DataProvider> */}
  </React.StrictMode>
);