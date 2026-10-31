"use client";

import React, { useState } from "react";
import { Plus, Trash2, Edit3, Check, X, Sparkles } from "lucide-react";
import { useMenu } from "@/hooks/useMenu";
import { MenuItem } from "@/types/menu";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { SERVICE_CATEGORIES } from "@/constants/services";

export function MenuManager() {
  const { menuItems, updateMenuItem, addMenuItem, deleteMenuItem } = useMenu();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState(0);
  const [editDuration, setEditDuration] = useState(0);
  const [editDescription, setEditDescription] = useState("");
  const [editPopular, setEditPopular] = useState(false);

  // New item modal
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newCategory, setNewCategory] = useState<string>(SERVICE_CATEGORIES[0]);
  const [newPrice, setNewPrice] = useState(2500);
  const [newDuration, setNewDuration] = useState(45);
  const [newDescription, setNewDescription] = useState("");
  const [newPopular, setNewPopular] = useState(false);

  const startEdit = (item: MenuItem) => {
    setEditingId(item.id);
    setEditName(item.name);
    setEditPrice(item.price);
    setEditDuration(item.duration);
    setEditDescription(item.description);
    setEditPopular(!!item.popular);
  };

  const saveEdit = (id: string) => {
    updateMenuItem(id, {
      name: editName,
      price: editPrice,
      duration: editDuration,
      description: editDescription,
      popular: editPopular,
    });
    setEditingId(null);
  };

  const handleCreateItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    addMenuItem({
      name: newName,
      category: newCategory,
      price: Number(newPrice),
      duration: Number(newDuration),
      description: newDescription,
      popular: newPopular,
    });

    setNewName("");
    setNewDescription("");
    setIsNewModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#2F2F2A] pb-4">
        <div>
          <h2 className="font-serif text-3xl font-light text-[#F0EBE1]">
            Menu & Tariff Catalog
          </h2>
          <p className="text-xs text-[#8A8A7A]">
            Directly modify service titles, pricing, and durations. Broadcasts to
            client menu live.
          </p>
        </div>

        <Button
          size="sm"
          variant="accent"
          onClick={() => setIsNewModalOpen(true)}
          className="flex items-center gap-2 text-xs py-2.5"
        >
          <Plus className="w-4 h-4" />
          <span>Add Custom Service</span>
        </Button>
      </div>

      {/* Menu Items Table */}
      <div
        className="bg-[#222220] border border-[#2F2F2A] overflow-x-auto"
        style={{ borderRadius: 0 }}
      >
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-[#2F2F2A] text-[#8A8A7A] uppercase tracking-wider bg-[#1E1E1C]">
              <th className="py-4 px-6 font-medium">Service Name</th>
              <th className="py-4 px-6 font-medium">Category</th>
              <th className="py-4 px-6 font-medium">Tariff (INR)</th>
              <th className="py-4 px-6 font-medium">Duration</th>
              <th className="py-4 px-6 font-medium">Badge</th>
              <th className="py-4 px-6 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2F2F2A]">
            {menuItems.map((item) => {
              const isEditing = editingId === item.id;

              return (
                <tr key={item.id} className="hover:bg-[#282825] transition-colors">
                  <td className="py-4 px-6 max-w-xs">
                    {isEditing ? (
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="w-full bg-[#121210] border border-[#2F2F2A] px-2 py-1 text-xs text-[#F0EBE1] focus:outline-none focus:border-[var(--color-gold)]"
                      />
                    ) : (
                      <div>
                        <div className="font-medium text-[#F0EBE1] text-sm">
                          {item.name}
                        </div>
                        <div className="text-[11px] text-[#8A8A7A] truncate">
                          {item.description}
                        </div>
                      </div>
                    )}
                  </td>

                  <td className="py-4 px-6">
                    <span className="font-mono text-[11px] uppercase text-[var(--color-gold)]">
                      {item.category}
                    </span>
                  </td>

                  <td className="py-4 px-6">
                    {isEditing ? (
                      <div className="flex items-center gap-1">
                        <span className="text-[#8A8A7A]">₹</span>
                        <input
                          type="number"
                          value={editPrice}
                          onChange={(e) => setEditPrice(Number(e.target.value))}
                          className="w-24 bg-[#121210] border border-[#2F2F2A] px-2 py-1 text-xs text-[#F0EBE1] font-mono focus:outline-none focus:border-[var(--color-gold)]"
                        />
                      </div>
                    ) : (
                      <span className="font-serif text-base text-[#F0EBE1]">
                        ₹{item.price.toLocaleString("en-IN")}
                      </span>
                    )}
                  </td>

                  <td className="py-4 px-6">
                    {isEditing ? (
                      <input
                        type="number"
                        value={editDuration}
                        onChange={(e) =>
                          setEditDuration(Number(e.target.value))
                        }
                        className="w-16 bg-[#121210] border border-[#2F2F2A] px-2 py-1 text-xs text-[#F0EBE1] font-mono focus:outline-none focus:border-[var(--color-gold)]"
                      />
                    ) : (
                      <span className="text-[#8A8A7A] font-mono text-[11px]">
                        {item.duration}m
                      </span>
                    )}
                  </td>

                  <td className="py-4 px-6">
                    {isEditing ? (
                      <label className="flex items-center gap-1.5 cursor-pointer text-xs">
                        <input
                          type="checkbox"
                          checked={editPopular}
                          onChange={(e) => setEditPopular(e.target.checked)}
                        />
                        <span>Popular</span>
                      </label>
                    ) : (
                      item.popular && (
                        <span className="inline-flex items-center gap-1 bg-[var(--color-gold)] text-black text-[10px] uppercase font-bold px-2 py-0.5">
                          <Sparkles className="w-2.5 h-2.5" /> Popular
                        </span>
                      )
                    )}
                  </td>

                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {isEditing ? (
                        <>
                          <button
                            type="button"
                            onClick={() => saveEdit(item.id)}
                            className="p-1.5 bg-[var(--color-gold)] text-black font-semibold hover:bg-[var(--color-gold-light)] cursor-pointer"
                            title="Save changes"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditingId(null)}
                            className="p-1.5 bg-[#121210] border border-[#2F2F2A] text-[#8A8A7A] hover:text-white cursor-pointer"
                            title="Cancel"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            type="button"
                            onClick={() => startEdit(item)}
                            className="p-1.5 border border-[#2F2F2A] hover:border-[#8A8A7A] text-[#8A8A7A] hover:text-white cursor-pointer transition-colors"
                            title="Edit Service"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteMenuItem(item.id)}
                            className="p-1.5 border border-[#2F2F2A] hover:border-[#8B1A1A] text-[#8A8A7A] hover:text-[#8B1A1A] cursor-pointer transition-colors"
                            title="Delete Service"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Add New Service Modal */}
      <Modal
        isOpen={isNewModalOpen}
        onClose={() => setIsNewModalOpen(false)}
        title="Add Atelier Service"
        className="bg-[#1A1A1A] text-[#F0EBE1] border-[#2F2F2A]"
      >
        <form onSubmit={handleCreateItem} className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-[#8A8A7A] mb-1">
              Service Name
            </label>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="e.g. 24K Liquid Gold Gloss Ritual"
              required
              className="w-full bg-[#121210] border border-[#2F2F2A] px-3 py-2 text-sm text-[#F0EBE1] focus:outline-none focus:border-[var(--color-gold)]"
              style={{ borderRadius: 0 }}
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#8A8A7A] mb-1">
                Category
              </label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="w-full bg-[#121210] border border-[#2F2F2A] px-2 py-2 text-xs text-[#F0EBE1] focus:outline-none focus:border-[var(--color-gold)]"
                style={{ borderRadius: 0 }}
              >
                {SERVICE_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#8A8A7A] mb-1">
                Tariff (₹)
              </label>
              <input
                type="number"
                value={newPrice}
                onChange={(e) => setNewPrice(Number(e.target.value))}
                required
                className="w-full bg-[#121210] border border-[#2F2F2A] px-3 py-2 text-xs text-[#F0EBE1] font-mono focus:outline-none focus:border-[var(--color-gold)]"
                style={{ borderRadius: 0 }}
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#8A8A7A] mb-1">
                Duration (m)
              </label>
              <input
                type="number"
                value={newDuration}
                onChange={(e) => setNewDuration(Number(e.target.value))}
                required
                className="w-full bg-[#121210] border border-[#2F2F2A] px-3 py-2 text-xs text-[#F0EBE1] font-mono focus:outline-none focus:border-[var(--color-gold)]"
                style={{ borderRadius: 0 }}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#8A8A7A] mb-1">
              Description
            </label>
            <textarea
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="Describe the aesthetic and sensory notes of this treatment..."
              rows={3}
              required
              className="w-full bg-[#121210] border border-[#2F2F2A] px-3 py-2 text-xs text-[#F0EBE1] focus:outline-none focus:border-[var(--color-gold)]"
              style={{ borderRadius: 0 }}
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="popular-check"
              checked={newPopular}
              onChange={(e) => setNewPopular(e.target.checked)}
            />
            <label
              htmlFor="popular-check"
              className="text-xs text-[#F0EBE1] cursor-pointer"
            >
              Highlight with &apos;Popular&apos; Gold Ribbon
            </label>
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsNewModalOpen(false)}
              className="border-[#2F2F2A] text-[#8A8A7A]"
            >
              Cancel
            </Button>
            <Button type="submit" variant="accent" size="sm">
              Save Service to Menu
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
