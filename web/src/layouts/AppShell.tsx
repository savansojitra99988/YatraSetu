import { Outlet, NavLink } from 'react-router-dom';
import { Home, Compass, Map, Shield, HeartHandshake, BarChart3, Settings } from 'lucide-react';
import './AppShell.css';

export default function AppShell() {
  return (
    <div className="app-shell-container">
      <nav className="sidebar">
        <div className="brand">
          <span className="logo-icon">Y</span>
          <h2>Yatra<span>Setu</span></h2>
        </div>
        
        <div className="nav-links">
          <NavLink to="/" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            <Home size={20} />
            <span>Dashboard</span>
          </NavLink>
          
          <div className="nav-section-title">Discover & Decide</div>
          <NavLink to="/discover" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            <Compass size={20} />
            <span>Discovery Engine</span>
          </NavLink>

          <div className="nav-section-title">Travel & Mobility</div>
          <NavLink to="/mobility" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            <Map size={20} />
            <span>Smart Routes</span>
          </NavLink>

          <div className="nav-section-title">Safety & Support</div>
          <NavLink to="/safety" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            <Shield size={20} />
            <span>Safety Indicator</span>
          </NavLink>

          <div className="nav-section-title">Trust & Economy</div>
          <NavLink to="/trust" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            <HeartHandshake size={20} />
            <span>Verified Stays</span>
          </NavLink>

          <div className="nav-section-title">Government</div>
          <NavLink to="/gov" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            <BarChart3 size={20} />
            <span>Demand Analytics</span>
          </NavLink>
        </div>

        <div className="sidebar-footer">
          <button className="nav-item">
            <Settings size={20} />
            <span>Settings</span>
          </button>
        </div>
      </nav>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
