import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, NavLink, Navigate, Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { 
  FiHome, 
  FiShoppingCart, 
  FiBox, 
  FiGrid, 
  FiBarChart2, 
  FiLogOut 
} from 'react-icons/fi';

import Dashboard from './components/dashboard';
import POS from './components/POS';
import Products from './components/products';
import Categories from './components/categories';
import Report from './components/report';
import Login from './components/login';
import Logout from './components/logout';

function MainLayout({ user }) {
  const navLinkStyle = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
      isActive
        ? 'bg-indigo-600 text-white font-semibold'
        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
    }`;

  return (
    <div className="flex min-h-screen bg-slate-100 text-slate-900">
      <aside className="w-64 bg-slate-900 text-slate-100 flex flex-col fixed inset-y-0 left-0 z-30 shadow-xl">
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-xl font-bold tracking-wide text-white">
            Angkor-Electronic
          </h1>
          {user && (
            <div className="mt-2 text-xs text-indigo-400">
              👤 {user.full_name} ({user.role})
            </div>
          )}
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1">
          <NavLink to="/dashboard" className={navLinkStyle}>
            <FiHome size={18} />
            <span>Dashboard</span>
          </NavLink>

          <NavLink to="/pos" className={navLinkStyle}>
            <FiShoppingCart size={18} />
            <span>POS</span>
          </NavLink>

          <NavLink to="/products" className={navLinkStyle}>
            <FiBox size={18} />
            <span>Products</span>
          </NavLink>

          <NavLink to="/categories" className={navLinkStyle}>
            <FiGrid size={18} />
            <span>Categories</span>
          </NavLink>

          <NavLink to="/report" className={navLinkStyle}>
            <FiBarChart2 size={18} />
            <span>Reports</span>
          </NavLink>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <NavLink to="/logout" className={navLinkStyle}>
            <FiLogOut size={18} />
            <span>Logout</span>
          </NavLink>
        </div>
      </aside>

      <main className="flex-1 ml-64 p-8 overflow-y-auto min-h-screen">
        <Outlet />
      </main>
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