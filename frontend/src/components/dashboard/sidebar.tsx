"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Layers, ChevronDown, ChevronUp, User } from "lucide-react";
import { useState } from "react";
import { SignOutButton } from "@/app/dashboard/sign-out-button";

type Role = "admin" | "user" | "tutor";

const navItems = [
  {
    title: "Brands",
    href: "/dashboard/brands",
    icon: Layers,
    roles: ["admin", "user", "tutor"] as Role[],
  },
];

interface SidebarProps {
  role?: string;
  userEmail?: string;
  userName?: string | null;
}

export function Sidebar({ role = "tutor", userEmail, userName }: SidebarProps) {
  const pathname = usePathname();
  const [isStoreDropdownOpen, setIsStoreDropdownOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const visibleItems = navItems.filter((item) =>
    item.roles.includes(role as Role)
  );

  return (
    <div className="flex h-full w-64 flex-col border-r border-[#1e1e1e] bg-[#121212]">
      <div className="flex h-14 items-center border-b border-[#1e1e1e] px-4">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold text-white">
          <span>lilo social</span>
        </Link>
      </div>

      {/* Store Selector Dropdown */}
      <div className="p-4">
        <button
          onClick={() => setIsStoreDropdownOpen(!isStoreDropdownOpen)}
          className="w-full flex items-center gap-3 px-4 py-3 bg-[#0c0c0c] border border-[#1e1e1e] rounded-lg hover:border-[#fc5810] transition-colors"
        >
          <div className="w-8 h-8 bg-[#fc5810] rounded-full flex items-center justify-center text-white text-sm font-bold">
            CN
          </div>
          <span className="flex-1 text-left text-white text-sm font-medium">
            SELECT STORE
          </span>
          <ChevronDown className={cn(
            "h-4 w-4 text-white transition-transform",
            isStoreDropdownOpen && "rotate-180"
          )} />
        </button>

        {isStoreDropdownOpen && (
          <div className="mt-2 bg-[#0c0c0c] border border-[#1e1e1e] rounded-lg overflow-hidden">
            <div className="px-4 py-2 text-xs text-[#8a8a8a] uppercase">
              SELECT STORE
            </div>
            <div className="px-4 py-6 text-center text-sm text-[#8a8a8a]">
              No stores found
            </div>
          </div>
        )}
      </div>

      {/* Quick Links */}
      <div className="px-4">
        <h3 className="text-xs text-[#8a8a8a] uppercase mb-2 px-3">Quick Links</h3>
      </div>

      <nav className="flex-1 space-y-1 px-4">
        {visibleItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
              pathname === item.href
                ? "bg-[#fc5810] text-white"
                : "text-[#8a8a8a] hover:bg-[#1e1e1e] hover:text-white"
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.title}
          </Link>
        ))}
      </nav>

      {/* User Profile Section */}
      <div className="border-t border-[#1e1e1e] p-4">
        <button
          onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
          className="w-full flex items-center gap-3 px-3 py-2 text-white hover:bg-[#1e1e1e] rounded-lg transition-colors"
        >
          <User className="h-4 w-4" />
          <span className="flex-1 text-left text-sm">
            {userName || userEmail}
          </span>
          <ChevronUp className="h-4 w-4" />
        </button>

        {isProfileMenuOpen && (
          <div className="mt-2 px-3">
            <SignOutButton />
          </div>
        )}
      </div>
    </div>
  );
}
