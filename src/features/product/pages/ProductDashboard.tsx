import React from 'react';
import { ArrowLeft, TrendingUp, Package, Users } from 'lucide-react';
import { Product } from '../types/Product';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { StatCard } from '@/components/stats/StatCard';
import { SalesChart } from '@/components/charts/SalesChart';
import { CategoryChart } from '@/components/charts/CategoryChart';
import { PerformanceChart } from '@/components/charts/PerformanceChart';
import { generateSalesData, generateCategoryData, generatePerformanceData } from '@/utils/mock-data';

interface ProductDashboardProps {
  product: Product;
  onBack: () => void;
}

export function ProductDashboard({ product, onBack }: ProductDashboardProps) {
  const salesData = generateSalesData();
  const categoryData = generateCategoryData();
  const performanceData = generatePerformanceData();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6">
        <Button
          variant="secondary"
          size="sm"
          icon={ArrowLeft}
          onClick={onBack}
          className="mb-6"
        >
          Back to Products
        </Button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
          <p className="text-gray-600">{product.text}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            icon={TrendingUp}
            iconColor="text-blue-600"
            iconBgColor="bg-blue-100"
            label="Monthly Sales"
            value="$12,345"
          />
          <StatCard
            icon={Package}
            iconColor="text-green-600"
            iconBgColor="bg-green-100"
            label="Total Units"
            value="1,234"
          />
          <StatCard
            icon={Users}
            iconColor="text-purple-600"
            iconBgColor="bg-purple-100"
            label="Active Users"
            value="5,678"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <SalesChart data={salesData} />

          <Card className="lg:col-span-2 grid grid-cols-5 gap-8">
            <div className="col-span-2">
              <CategoryChart data={categoryData} />
            </div>
            
            <div className="col-span-3">
              <PerformanceChart data={performanceData} />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}