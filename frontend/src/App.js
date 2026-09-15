import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, NavLink, Navigate, Outlet, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// 1. Import Font Awesome Components & Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHouse, 
  faCartShopping, 
  faBox, 
  faGrip, 
  faChartSimple, 
  faRightFromBracket,
  faClock,
  faBell,
  faCircleQuestion 
} from '@fortawesome/free-solid-svg-icons';

import Dashboard from './components/dashboard';
import POS from './components/POS';
import Products from './components/products';
import Categories from './components/categories';
import Report from './components/report';
import Login from './components/login';
import Logout from './components/logout';

function MainLayout({ user }) {
  const location = useLocation();

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/dashboard': return 'Dashboard';
      case '/pos': return 'Sales & POS';
      case '/products': return 'Products';
      case '/categories': return 'Categories';
      case '/report': return 'Reports';
      default: return 'Dashboard';
    }
  };

  const navLinkStyle = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
      isActive
        ? 'bg-[#2c3440] text-white font-semibold border-l-4 border-cyan-400'
        : 'text-gray-400 hover:bg-[#2c3440]/50 hover:text-white'
    }`;

  return (
    <div className="flex min-h-screen bg-[#f4f5f7] text-gray-800">
      
      {/* Sidebar */}
      <aside className="w-64 bg-[#22252a] text-gray-300 flex flex-col fixed inset-y-0 left-0 z-30 shadow-xl justify-between">
        <div>
          {/* Brand Header */}
          <div className="p-4 border-b border-gray-800 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#1b8398] flex items-center justify-center text-white font-bold text-xl">
              A
            </div>
            <div>
              <h1 className="text-sm font-bold tracking-wide text-white leading-none">
                Angkor-Electronic
              </h1>
              <p className="text-[10px] text-gray-400 mt-1">PHONE MANAGEMENT SYSTEM</p>
              {user && (
                <div className="mt-1 text-[11px] text-cyan-400">
                  👤 {user.full_name} ({user.role})
                </div>
              )}
            </div>
          </div>

          {/* Navigation Links (ប្រើ FontAwesomeIcon) */}
          <nav className="flex-1 px-3 py-4 space-y-1">
            <NavLink to="/dashboard" className={navLinkStyle}>
              <FontAwesomeIcon icon={faHouse} className="w-4 h-4" />
              <span>Dashboard</span>
            </NavLink>

            <NavLink to="/pos" className={navLinkStyle}>
              <FontAwesomeIcon icon={faCartShopping} className="w-4 h-4" />
              <span>POS</span>
            </NavLink>

            <NavLink to="/products" className={navLinkStyle}>
              <FontAwesomeIcon icon={faBox} className="w-4 h-4" />
              <span>Products</span>
            </NavLink>

            <NavLink to="/categories" className={navLinkStyle}>
              <FontAwesomeIcon icon={faGrip} className="w-4 h-4" />
              <span>Categories</span>
            </NavLink>

            <NavLink to="/report" className={navLinkStyle}>
              <FontAwesomeIcon icon={faChartSimple} className="w-4 h-4" />
              <span>Reports</span>
            </NavLink>
          </nav>
        </div>

        {/* Footer Logout */}
        <div className="p-3 border-t border-gray-800">
          <NavLink to="/logout" className={navLinkStyle}>
            <FontAwesomeIcon icon={faRightFromBracket} className="w-4 h-4" />
            <span>Logout</span>
          </NavLink>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        
        {/* Header Bar */}
        <header className="bg-[#1b8398] text-white px-8 py-4 flex items-center justify-between shadow-sm sticky top-0 z-20">
          <div>
            <h1 className="text-xl font-bold">{getPageTitle()}</h1>
            <p className="text-xs text-cyan-100">Angkor-Electronic</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-[#176d7e] px-3 py-1.5 rounded-lg text-xs font-medium">
              {/* <FontAwesomeIcon icon={faClock} /> */}
              {/* <span>Wed 12 Aug 2026 02:40 PM</span> */}
            </div>
            {/* <button className="p-2 bg-[#176d7e] rounded-lg hover:bg-[#145d6c] transition">
              <FontAwesomeIcon icon={faBell} />
            </button>
            <button className="p-2 bg-[#176d7e] rounded-lg hover:bg-[#145d6c] transition">
              <FontAwesomeIcon icon={faCircleQuestion} />
            </button> */}
          </div>
        </header>

        {/* Main Body */}
        <main className="flex-1 p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>

    </div>
  );
}

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <Toaster position="top-right" />

      <Routes>
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route element={<MainLayout user={user} />}>
          <Route path="/dashboard" element={<Dashboard user={user} />} />
          <Route path="/pos" element={<POS user={user} />} />
          <Route path="/products" element={<Products user={user} />} />
          <Route path="/categories" element={<Categories user={user} />} />
          <Route path="/report" element={<Report user={user} />} />
          <Route path="/logout" element={<Logout setUser={setUser} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}