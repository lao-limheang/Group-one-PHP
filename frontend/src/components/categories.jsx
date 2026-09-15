import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FiEdit, FiTrash2, FiX } from 'react-icons/fi';

const INITIAL_CATEGORIES = [
  { id: 1, name: 'Smartphones', slug: 'smartphones', sort_order: 1, product_count: 12 },
  { id: 2, name: 'Accessories', slug: 'accessories', sort_order: 2, product_count: 24 },
  { id: 3, name: 'Tablets', slug: 'tablets', sort_order: 3, product_count: 5 },
  { id: 4, name: 'Smartwatches', slug: 'smartwatches', sort_order: 4, product_count: 8 },
];

const emptyForm = { name: '', slug: '', sort_order: 0 };

function Modal({ open, title, onClose, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-bold">{title}</h2>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600 rounded-lg">
            <FiX size={20} />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

export default function Categories() {
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const openCreate = () => {
    setEditing(null);
    setForm({ ...emptyForm, sort_order: categories.length + 1 });
    setModal(true);
  };

  const openEdit = (c) => {
    setEditing(c);
    setForm({ name: c.name, slug: c.slug, sort_order: c.sort_order });
    setModal(true);
  };

  const submit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      toast.error('Category name is required');
      return;
    }

    const categorySlug = form.slug.trim() || form.name.toLowerCase().replace(/\s+/g, '-');
    const sortOrderNum = Number(form.sort_order) || 0;

    if (editing) {
      setCategories((prev) =>
        prev.map((item) =>
          item.id === editing.id
            ? { ...item, name: form.name, slug: categorySlug, sort_order: sortOrderNum }
            : item
        )
      );
      toast.success('Category updated (Mock)');
    } else {
      const newCategory = {
        id: Date.now(),
        name: form.name,
        slug: categorySlug,
        sort_order: sortOrderNum,
        product_count: 0,
      };
      setCategories((prev) => [...prev, newCategory]);
      toast.success('Category created (Mock)');
    }

    setModal(false);
  };

  const remove = (c) => {
    if (!window.confirm(`Delete category "${c.name}"?`)) return;
    setCategories((prev) => prev.filter((item) => item.id !== c.id));
    toast.success('Category deleted (Mock)');
  };

  const move = (c, dir) => {
    setCategories((prev) =>
      prev.map((item) =>
        item.id === c.id ? { ...item, sort_order: item.sort_order + dir } : item
      )
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Categories</h1>
        <button
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-lg text-sm"
          onClick={openCreate}
        >
          + Add Category
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {categories.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No categories yet. Create one to organise your products.
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-left text-xs uppercase text-gray-500">
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Slug</th>
                <th className="px-4 py-3">Sort</th>
                <th className="px-4 py-3">Products</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {categories
                .slice()
                .sort((a, b) => a.sort_order - b.sort_order)
                .map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-semibold">{c.name}</td>
                    <td className="px-4 py-3 text-gray-500">{c.slug}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => move(c, -1)}
                          className="w-6 h-6 rounded hover:bg-gray-100 text-gray-500 font-bold"
                        >
                          ↑
                        </button>
                        <span className="w-6 text-center">{c.sort_order}</span>
                        <button
                          onClick={() => move(c, 1)}
                          className="w-6 h-6 rounded hover:bg-gray-100 text-gray-500 font-bold"
                        >
                          ↓
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-3">{c.product_count}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        <button
                          onClick={() => openEdit(c)}
                          className="p-2 rounded-lg hover:bg-slate-100 text-slate-600"
                        >
                          <FiEdit />
                        </button>
                        <button
                          onClick={() => remove(c)}
                          className="p-2 rounded-lg hover:bg-red-50 text-red-500"
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

      <Modal open={modal} title={editing ? 'Edit Category' : 'Add Category'} onClose={() => setModal(false)}>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Name *</label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g. Headphones"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Slug</label>
            <input
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="headphones (auto if empty)"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Sort Order</label>
            <input
              type="number"
              value={form.sort_order}
              onChange={(e) => setForm({ ...form, sort_order: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex gap-2 pt-2">
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-lg text-sm"
            >
              {editing ? 'Save Changes' : 'Add Category'}
            </button>
            <button
              type="button"
              onClick={() => setModal(false)}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-4 py-2 rounded-lg text-sm"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}