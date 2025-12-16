"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { SettingsNav } from "@/components/dashboard/settings-nav";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// Mock brand data
const mockBrandData: Record<string, string> = {
  "brand-1": "Acme Corporation",
  "brand-2": "TechStart Inc",
  "brand-3": "Global Solutions",
};

export default function BrandPage() {
  const params = useParams();
  const botId = params.botId as string;

  const [brandName, setBrandName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Debounce timer reference
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Load brand data on mount
  useEffect(() => {
    setIsLoading(true);
    // Simulate loading delay
    setTimeout(() => {
      const mockName = mockBrandData[botId] || "New Brand";
      setBrandName(mockName);
      setIsLoading(false);
    }, 300);
  }, [botId]);

  const saveBrandName = () => {
    if (!brandName.trim() || isSaving) return;

    setIsSaving(true);
    // Simulate save delay
    setTimeout(() => {
      toast.success("Brand name updated successfully");
      setIsSaving(false);
    }, 500);
  };

  // Debounced handler for input changes
  const handleBrandNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setBrandName(newValue);

    // Clear existing timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Set new timer for 1200ms (matching old app)
    if (newValue.trim()) {
      debounceTimerRef.current = setTimeout(() => {
        saveBrandName();
      }, 1200);
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      // Clear debounce timer and save immediately
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      saveBrandName();
    }
  };

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#121212]">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#121212]">
      {/* Settings Navigation */}
      <SettingsNav botId={botId} />

      {/* Main Content */}
      <div className="flex-1 bg-[#0c0c0c] mt-[63px] mr-[61px] mb-[63px] rounded-[10px] p-8">
        {/* Page Header */}
        <div className="mb-[10px]">
          <h1 className="text-[40px] font-medium text-white mb-[11px]">
            Brand
          </h1>
          <p className="text-[20px] font-light text-[#8a8a8a]">
            Manage your brand name
          </p>
        </div>

        {/* Brand Content */}
        <div className="mt-[10px]">
          <div className="bg-[#0c0c0c] border border-[#1e1e1e] rounded-[10px] p-8">
            <div className="flex gap-[7px] items-stretch">
              {/* Input Field */}
              <div className="flex-1 bg-[#1e1e1e] border border-[#4f4f4f] rounded-[10px] overflow-hidden">
                <Input
                  type="text"
                  placeholder="Enter your brand name"
                  value={brandName}
                  onChange={handleBrandNameChange}
                  onKeyPress={handleKeyPress}
                  disabled={isLoading || isSaving}
                  className="h-[46px] px-[19px] py-[13px] bg-transparent border-0 text-white placeholder:text-white text-[15px] focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>

              {/* Save Button */}
              <Button
                variant="stitch"
                onClick={saveBrandName}
                disabled={isLoading || isSaving || !brandName.trim()}
                className="w-[73px] h-[46px] px-8 py-4 text-[15px] font-bold"
              >
                {isSaving ? "Saving..." : "Save"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
