import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FiEdit, FiEye, FiTrash2 } from 'react-icons/fi';

// Mock products initial state
const MOCK_PRODUCTS = [
  {
    id: 1,
    name: 'Wireless Bluetooth Earbuds',
    category_name: 'Electronics',
    price: 49.99,
    sale_price: 39.99,
    quantity: 15,
    variations: [{ id: 101, name: 'Black' }, { id: 102, name: 'White' }],
    featured: true,
    images: [],
  },
  {
    id: 2,
    name: 'Smart Fitness Watch',
    category_name: 'Electronics',
    price: 89.00,
    sale_price: null,
    quantity: 3,
    variations: [],
    featured: false,
    images: [],
  },
  {
    id: 3,
    name: 'Cotton Graphic T-Shirt',
    category_name: 'Apparel',
    price: 19.99,
    sale_price: null,
    quantity: 0,
    variations: [{ id: 103, name: 'S' }, { id: 104, name: 'M' }, { id: 105, name: 'L' }],
    featured: true,
    images: [],
  },
];

export default function Products() {
  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const [search, setSearch] = useState('');

  // Handle local mock deletion
  const remove = (product) => {
    if (!window.confirm(`Delete product "${product.name}"?`)) return;
    setProducts((prev) => prev.filter((p) => p.id !== product.id));
    toast.success('Product deleted (Mock)');
  };

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    (p.category_name || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <Link
          to="/products/new"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-lg text-sm"
        >
          + Add Product
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="w-full md:w-72 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            {products.length === 0
              ? 'No products yet. Add your first product!'
              : 'No products match your search.'}
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-left text-xs uppercase text-gray-500">
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Stock</th>
                <th className="px-4 py-3">Variations</th>
                <th className="px-4 py-3">Featured</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-300">
                        🛍️
                      </div>
                      <span className="font-semibold">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-500">{p.category_name || '—'}</td>
                  <td className="px-4 py-3">
                    {p.sale_price != null && p.sale_price < p.price ? (
                      <span>
                        <span className="font-bold text-green-600">${p.sale_price.toFixed(2)}</span>{' '}
                        <span className="text-gray-400 line-through text-xs">${p.price.toFixed(2)}</span>
                      </span>
                    ) : (
                      <span className="font-bold">${p.price.toFixed(2)}</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {p.quantity <= 0 ? (
                      <span className="px-2 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">Out of stock</span>
                    ) : p.quantity <= 5 ? (
                      <span className="px-2 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-700">Low ({p.quantity})</span>
                    ) : (
                      <span className="font-semibold text-green-600">{p.quantity}</span>
                    )}
                  </td>
                  <td className="px-4 py-3">{p.variations?.length || 0}</td>
                  <td className="px-4 py-3">{p.featured ? '⭐' : '—'}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <button
                        onClick={() => toast('Preview mode only', { icon: 'ℹ️' })}
                        className="p-2 rounded-lg hover:bg-slate-100 text-slate-600"
                        title="View in store"
                      >
                        <FiEye />
                      </button>
                      <Link
                        to={`/products/${p.id}/edit`}
                        className="p-2 rounded-lg hover:bg-slate-100 text-slate-600"
                        title="Edit"
                      >
                        <FiEdit />
                      </Link>
                      <button
                        onClick={() => remove(p)}
                        className="p-2 rounded-lg hover:bg-red-50 text-red-500"
                        title="Delete"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}