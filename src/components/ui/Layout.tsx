import React from 'react';
import { LayoutGrid, ClipboardList } from 'lucide-react';
import { useAuth } from '@/store/AuthContext';
import { Button } from './Button';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Layout({ children, currentPage, onNavigate }: LayoutProps) {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="h-16 flex items-center px-6 border-b">
          <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
        </div>
        <nav className="p-4 space-y-2">
          <Button
            variant="secondary"
            onClick={() => onNavigate('products')}
            icon={LayoutGrid}
            className={`w-full justify-start ${
              currentPage === 'products'
                ? 'bg-indigo-50 text-indigo-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Products
          </Button>
          <Button
            variant="secondary"
            onClick={() => onNavigate('survey')}
            icon={ClipboardList}
            className={`w-full justify-start ${
              currentPage === 'survey'
                ? 'bg-indigo-50 text-indigo-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Survey
          </Button>
        </nav>
        <div className="absolute bottom-0 w-64 p-4 border-t">
          <Button
            variant="secondary"
            onClick={logout}
            className="w-full"
          >
            Sign Out
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="max-w-7xl mx-auto">{children}</div>
        </div>
      </div>
    </div>
  );
}