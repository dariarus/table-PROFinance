import React from 'react';
import ReactDOM from 'react-dom/client';

import './style.css'
import { App } from "./components/app/app";

const app = ReactDOM.createRoot(
  document.getElementById('app') as HTMLElement
);
app.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);
