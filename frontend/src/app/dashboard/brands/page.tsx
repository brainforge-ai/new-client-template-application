"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

// Mock brand data
const mockBrands = [
  { id: "brand-1", name: "Acme Corporation", createdAt: "2024-01-15" },
  { id: "brand-2", name: "TechStart Inc", createdAt: "2024-02-20" },
  { id: "brand-3", name: "Global Solutions", createdAt: "2024-03-10" },
];

export default function BrandsPage() {
  const [headerActions, setHeaderActions] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setHeaderActions(document.getElementById("header-actions"));
  }, []);

  const handleCreateBrand = () => {
    toast.success("Brand created successfully!");
    // In a real app, this would create a new brand and navigate to it
    // For now, just show the toast
  };

  const handleBrandClick = () => {
    // Brand clicked - no action for now
  };

  return (
    <>
      {headerActions && createPortal(
        <Button onClick={handleCreateBrand} variant="stitch" className="gap-2 text-sm px-4 py-2 h-9">
          Add brand
          <Plus className="h-3.5 w-3.5" />
        </Button>,
        headerActions
      )}
      <div className="p-6 min-h-screen bg-[#0c0c0c]">
        {mockBrands.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-[#8a8a8a] mb-4">No brands found</p>
            <p className="text-sm text-[#7B7B7B]">
              Create your first brand to get started
            </p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {mockBrands.map((brand) => (
              <Card
                key={brand.id}
                className="p-6 cursor-pointer bg-[#121212] border-[#1e1e1e] hover:border-[#fc5810] transition-colors rounded-[10px]"
                onClick={handleBrandClick}
              >
                <h3 className="text-white font-semibold text-lg mb-2">
                  {brand.name}
                </h3>
                <p className="text-sm text-[#8a8a8a]">
                  Created {new Date(brand.createdAt).toLocaleDateString()}
                </p>
              </Card>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
