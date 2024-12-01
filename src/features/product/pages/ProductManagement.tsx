import React, { useState } from 'react';
import { useAuth } from '@/store/AuthContext';
import { Layout } from '@/components/ui/Layout';
import { Modal } from '@/components/ui/Modal';
import { ProductForm } from '../components/ProductForm';
import { ProductList } from '../components/ProductList';
import { ProductControls } from '../components/ProductControls';
import { ProductDashboard } from './ProductDashboard';
import { useProducts } from '../hooks/useProducts';
import { Product } from '../types/Product';
import { SurveyPage } from '@/features/survey/pages/SurveyPage';
import { LoginForm } from '@/features/auth/components/LoginForm';

export function ProductManagement() {
  const { isAuthenticated } = useAuth();
  const { products, addProduct, editProduct, deleteProduct } = useProducts();
  const [isGrid, setIsGrid] = useState(true);
  const [sortAsc, setSortAsc] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('products');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  if (selectedProduct) {
    return (
      <ProductDashboard
        product={selectedProduct}
        onBack={() => setSelectedProduct(null)}
      />
    );
  }

  const sortedProducts = [...products].sort((a, b) => {
    const comparison = a.name.localeCompare(b.name);
    return sortAsc ? comparison : -comparison;
  });

  const handleAddProduct = (name: string, text: string) => {
    addProduct(name, text);
    setIsModalOpen(false);
  };

  return (
    <Layout currentPage={currentPage} onNavigate={setCurrentPage}>
      {currentPage === 'products' ? (
        <>
          <ProductControls
            isGrid={isGrid}
            setIsGrid={setIsGrid}
            sortAsc={sortAsc}
            setSortAsc={setSortAsc}
            onAddClick={() => setIsModalOpen(true)}
          />

          <div className="mt-6">
            {products.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg shadow">
                <p className="text-gray-500">No products yet. Add your first product above!</p>
              </div>
            ) : (
              <ProductList
                products={sortedProducts}
                onEdit={editProduct}
                onDelete={deleteProduct}
                isGrid={isGrid}
                onSelect={setSelectedProduct}
              />
            )}
          </div>
        </>
      ) : (
        <SurveyPage />
      )}
      
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Product"
      >
        <ProductForm onSubmit={handleAddProduct} />
      </Modal>
    </Layout>
  );
}