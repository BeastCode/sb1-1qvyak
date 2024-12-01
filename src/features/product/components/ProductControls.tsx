import React from 'react';
import { LayoutGrid, List, ArrowUpDown, Plus, FileSearch } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface ProductControlsProps {
  isGrid: boolean;
  setIsGrid: (isGrid: boolean) => void;
  sortAsc: boolean;
  setSortAsc: (sortAsc: boolean) => void;
  onAddClick: () => void;
}

export function ProductControls({ isGrid, setIsGrid, sortAsc, setSortAsc, onAddClick }: ProductControlsProps) {
  return (
    <div className="flex justify-end">
      <Button
        onClick={onAddClick}
        icon={Plus}
        className="mr-4"
      >
        Add Product
      </Button>

      <div className="flex justify-end space-x-4">
        <Button
          variant="secondary"
          onClick={() => setIsGrid(!isGrid)}
          icon={isGrid ? List : LayoutGrid}
        >
          {isGrid ? 'List View' : 'Grid View'}
        </Button>
        <Button
          variant="secondary"
          onClick={() => setSortAsc(!sortAsc)}
          icon={ArrowUpDown}
        >
          {sortAsc ? 'Sort Z-A' : 'Sort A-Z'}
        </Button>
      </div>
    </div>
  );
}