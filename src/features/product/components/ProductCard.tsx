import React, { useState } from 'react';
import { Pencil, Trash2, Check, X } from 'lucide-react';
import { Product } from '../types/Product';
import { Button } from '@/components/ui/Button';

interface ProductCardProps {
  product: Product;
  onEdit: (id: string, updates: Partial<Product>) => void;
  onDelete: (id: string) => void;
  isGrid: boolean;
  onSelect: (product: Product) => void;
}

export function ProductCard({ product, onEdit, onDelete, isGrid, onSelect }: ProductCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(product.name);
  const [text, setText] = useState(product.text);

  const handleSave = () => {
    if (name.trim() && text.trim()) {
      onEdit(product.id, { name: name.trim(), text: text.trim() });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setName(product.name);
    setText(product.text);
    setIsEditing(false);
  };

  const baseClasses = `bg-white rounded-lg shadow-md p-4 ${
    isGrid ? 'h-full' : 'mb-4'
  }`;

  if (isEditing) {
    return (
      <div className={baseClasses}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-2 p-2 border rounded"
        />
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
          rows={3}
        />
        <div className="flex justify-end space-x-2">
          <Button
            variant="primary"
            size="sm"
            icon={Check}
            onClick={handleSave}
          />
          <Button
            variant="danger"
            size="sm"
            icon={X}
            onClick={handleCancel}
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${baseClasses} cursor-pointer transition-all hover:shadow-lg`}
      onClick={() => onSelect(product)}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
        <div className="flex space-x-2" onClick={(e) => e.stopPropagation()}>
          <Button
            variant="secondary"
            size="sm"
            icon={Pencil}
            onClick={() => setIsEditing(true)}
          />
          <Button
            variant="danger"
            size="sm"
            icon={Trash2}
            onClick={() => onDelete(product.id)}
          />
        </div>
      </div>
      <p className="text-gray-600">{product.text}</p>
      <div className="mt-2 text-sm text-gray-500">
        Added: {product.createdAt.toLocaleDateString()}
      </div>
    </div>
  );
}