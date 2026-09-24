import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import AppShell from './layouts/AppShell';
import Dashboard from './pages/Dashboard';
import Discover from './pages/Discover';
import Mobility from './pages/Mobility';
import Safety from './pages/Safety';
import Trust from './pages/Trust';
import Gov from './pages/Gov';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppShell />}>
            <Route index element={<Dashboard />} />
            <Route path="discover" element={<Discover />} />
            <Route path="mobility" element={<Mobility />} />
            <Route path="safety" element={<Safety />} />
            <Route path="trust" element={<Trust />} />
            <Route path="gov" element={<Gov />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  </React.StrictMode>
);
