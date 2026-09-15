import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiShoppingBag } from 'react-icons/fi';

export default function Login({ setUser }) {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { username, password } = form;

    // Authentication Logic
    if (username === 'admin' && password === '123456') {
      if (setUser) setUser({ full_name: 'Chork Chansovanpanha', role: 'Admin' });
      navigate('/dashboard');
    } else if (username === 'cashier' && password === '123456') {
      if (setUser) setUser({ full_name: 'Som Sreyvith', role: 'Cashier' });
      navigate('/dashboard');
    } else {
      setError('Username & Passsword Incorrect!!...');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
      <div className="w-full max-w-sm">
        {/* Header Section */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-indigo-600 text-white flex items-center justify-center mb-3 shadow-lg">
            <FiShoppingBag className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-wide">
            Angkor-Electronic
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Sign in to access shop dashboard
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-6 space-y-4">
          {error && (
            <div className="bg-red-50 text-red-600 text-xs p-3 rounded-lg border border-red-200 text-center font-medium">
              {error}
            </div>
          )}

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Username
            </label>
            <input
              type="text"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition-all"
              placeholder="Enter username"
              required
              autoFocus
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Password
            </label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition-all"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-lg font-semibold text-sm transition-colors shadow-md disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Sign in'}
          </button>

          {/* <p className="text-xs text-center text-gray-400 mt-4">
            Test accounts: <span className="font-semibold text-gray-600">admin / 123</span> or <span className="font-semibold text-gray-600">cashier / 123</span>
          </p> */}
        </form>
      </div>
    </div>
  );
}