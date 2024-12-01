import { useState, useCallback } from 'react';
import { Product } from '../types/Product';

const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Coffee Maker',
    text: 'Professional-grade coffee maker with built-in grinder and programmable settings.',
    createdAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    name: 'Smart Home Hub',
    text: 'Central control unit for all your smart home devices. Features voice control.',
    createdAt: new Date('2024-02-01'),
  },
];

export function useProducts() {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const addProduct = useCallback((name: string, text: string) => {
    const newProduct: Product = {
      id: crypto.randomUUID(),
      name,
      text,
      createdAt: new Date(),
    };
    setProducts(prev => [...prev, newProduct]);
  }, []);

  const editProduct = useCallback((id: string, updates: Partial<Product>) => {
    setProducts(prev =>
      prev.map(product =>
        product.id === id ? { ...product, ...updates } : product
      )
    );
  }, []);

  const deleteProduct = useCallback((id: string) => {
    setProducts(prev => prev.filter(product => product.id !== id));
  }, []);

  return {
    products,
    addProduct,
    editProduct,
    deleteProduct,
  };
}