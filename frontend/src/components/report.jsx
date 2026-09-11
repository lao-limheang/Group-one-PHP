import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FiDownload } from 'react-icons/fi';

const MOCK_SALES = {
  totals: { revenue: 12450.0, orders: 48 },
  data: [
    { date: '2026-09-08', orders: 15, revenue: 3450.0 },
    { date: '2026-09-09', orders: 18, revenue: 4200.0 },
    { date: '2026-09-10', orders: 15, revenue: 4800.0 },
  ],
};

const MOCK_PRODUCTS = [
  { name: 'iPhone 15 Pro', units: 22, revenue: 21978.0 },
  { name: 'Samsung Galaxy S24', units: 14, revenue: 12586.0 },
  { name: 'AirPods Pro 2', units: 35, revenue: 8715.0 },
];

const MOCK_CUSTOMERS = [
  { id: 1, name: 'Sokha Chan', phone: '012 345 678', order_count: 5, total_spent: 1250.0 },
  { id: 2, name: 'Bory Nguon', phone: '098 765 432', order_count: 3, total_spent: 890.0 },
  { id: 3, name: 'Vannak Heng', phone: '077 112 233', order_count: 2, total_spent: 450.0 },
];

export default function Reports() {
  const [period, setPeriod] = useState('daily');
  const [sales, setSales] = useState(null);
  const [products, setProducts] = useState(null);
  const [customers, setCustomers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('sales');

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setSales(MOCK_SALES);
      setProducts(MOCK_PRODUCTS);
      setCustomers(MOCK_CUSTOMERS);
      setLoading(false);
    }, 200);

    return () => clearTimeout(timer);
  }, [period]);

  const exportCsv = (rows, name) => {
    if (!rows || rows.length === 0) {
      toast.error('Nothing to export');
      return;
    }
    const header = Object.keys(rows[0]);
    const csv = [
      header.join(','),
      ...rows.map((r) =>
        header.map((h) => `"${String(r[h] ?? '').replace(/"/g, '""')}"`).join(',')
      ),
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${name}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  const tabs = [
    { key: 'sales', label: 'Sales Report' },
    { key: 'products', label: 'Product Performance' },
    { key: 'customers', label: 'Customer Report' },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Reports</h1>
        {tab === 'sales' && (
          <div className="flex items-center gap-2">
            <div className="flex gap-1 bg-white border rounded-lg p-1">
              {['daily', 'weekly', 'monthly'].map((p) => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold capitalize ${
                    period === p
                      ? 'bg-indigo-600 text-white'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
            <button
              onClick={() => exportCsv(sales?.data || [], 'sales_report')}
              className="px-3 py-1.5 bg-white border hover:bg-gray-50 text-gray-700 rounded-lg text-sm font-semibold flex items-center gap-1"
            >
              <FiDownload /> CSV
            </button>
          </div>
        )}
      </div>

      <div className="flex gap-2 mb-6">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold ${
              tab === t.key
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-600 border hover:bg-gray-50'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'sales' && (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-5 border-b flex justify-between items-center">
            <h2 className="font-bold">Sales — {period}</h2>
            <span className="text-sm text-gray-500">
              <strong className="text-lg text-indigo-600">
                ${sales?.totals?.revenue?.toFixed(2) || '0.00'}
              </strong>{' '}
              revenue · {sales?.totals?.orders || 0} orders
            </span>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-left text-xs uppercase text-gray-500">
                <th className="px-4 py-3">Period</th>
                <th className="px-4 py-3">Orders</th>
                <th className="px-4 py-3">Revenue</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {sales?.data?.map((row) => (
                <tr key={row.date} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium">{row.date}</td>
                  <td className="px-4 py-3">{row.orders}</td>
                  <td className="px-4 py-3 font-semibold">${row.revenue.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'products' && (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-5 border-b flex justify-between items-center">
            <h2 className="font-bold">Product Performance</h2>
            <button
              onClick={() => exportCsv(products || [], 'product_report')}
              className="px-3 py-1.5 bg-white border hover:bg-gray-50 text-gray-700 rounded-lg text-sm font-semibold flex items-center gap-1"
            >
              <FiDownload /> CSV
            </button>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-left text-xs uppercase text-gray-500">
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">Units Sold</th>
                <th className="px-4 py-3">Revenue</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {products?.map((row, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium">{row.name}</td>
                  <td className="px-4 py-3">{row.units}</td>
                  <td className="px-4 py-3 font-semibold">${row.revenue.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'customers' && (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-5 border-b flex justify-between items-center">
            <h2 className="font-bold">Customer Report</h2>
            <button
              onClick={() =>
                exportCsv(
                  (customers || []).map((c) => ({
                    name: c.name,
                    phone: c.phone,
                    orders: c.order_count,
                    total_spent: c.total_spent,
                  })),
                  'customer_report'
                )
              }
              className="px-3 py-1.5 bg-white border hover:bg-gray-50 text-gray-700 rounded-lg text-sm font-semibold flex items-center gap-1"
            >
              <FiDownload /> CSV
            </button>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-left text-xs uppercase text-gray-500">
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Orders</th>
                <th className="px-4 py-3">Total Spent</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {customers?.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium">{c.name}</td>
                  <td className="px-4 py-3 text-gray-500">{c.phone}</td>
                  <td className="px-4 py-3">{c.order_count}</td>
                  <td className="px-4 py-3 font-semibold">${c.total_spent.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}