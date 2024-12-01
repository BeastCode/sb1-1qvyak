import React from 'react';
import { AuthProvider } from '@/store/AuthContext';
import { ProductManagement } from '@/features/product/pages/ProductManagement';

function App() {
  return (
    <AuthProvider>
      <ProductManagement />
    </AuthProvider>
  );
}

export default App;