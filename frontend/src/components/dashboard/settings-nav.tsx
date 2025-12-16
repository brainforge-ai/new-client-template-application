"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  BrandIcon,
  IntegrationsIcon,
  ApiKeysIcon,
  ReportsIcon,
  DeleteIcon,
} from "@/components/icons";

interface SettingsNavProps {
  botId: string;
}

export function SettingsNav({ botId }: SettingsNavProps) {
  const pathname = usePathname();

  const navItems = [
    {
      id: "brand",
      label: "Brand",
      href: `/dashboard/brands/${botId}`,
      icon: BrandIcon,
    },
    {
      id: "integrations",
      label: "Integrations",
      href: `/dashboard/brands/${botId}/integrations`,
      icon: IntegrationsIcon,
    },
    {
      id: "api-keys",
      label: "API Keys",
      href: `/dashboard/brands/${botId}/api-keys`,
      icon: ApiKeysIcon,
    },
    {
      id: "reports",
      label: "Reports",
      href: `/dashboard/brands/${botId}/reports`,
      icon: ReportsIcon,
    },
    {
      id: "delete",
      label: "Delete",
      href: `/dashboard/brands/${botId}/delete`,
      icon: DeleteIcon,
    },
  ];

  return (
    <div className="w-[259px] flex flex-col gap-0 px-12 pt-[50px] flex-shrink-0">
      {/* Settings Header */}
      <div className="h-[57px] flex items-center rounded-[10px]">
        <h2 className="font-bold text-[20px] text-white m-0 p-0 leading-[1.2]">
          Settings
        </h2>
      </div>

      {/* Navigation Menu */}
      <nav className="flex flex-col gap-0">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const IconComponent = item.icon;

          return (
            <Link
              key={item.id}
              href={item.href}
              className={cn(
                "flex items-center gap-4 w-[220px] h-[37px] px-[15px] py-[9px] rounded-[10px]",
                "border border-transparent transition-all",
                isActive && "border-white"
              )}
            >
              <div
                className={cn(
                  "w-4 h-4 flex items-center justify-center flex-shrink-0",
                  isActive ? "text-white" : "text-[#7B7B7B]"
                )}
              >
                <IconComponent className="w-full h-full" />
              </div>
              <span
                className={cn(
                  "text-[16px] font-normal leading-[1.2] m-0",
                  isActive ? "text-white" : "text-[#7B7B7B]"
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
