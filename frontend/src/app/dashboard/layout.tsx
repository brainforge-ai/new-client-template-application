"use client";

import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Sidebar } from "@/components/dashboard/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/");
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0c0c0c]">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="flex h-screen bg-[#0c0c0c]">
      <Sidebar
        role={(session.user as { role?: string }).role}
        userEmail={session.user.email}
        userName={session.user.name}
      />
      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-[#1e1e1e] px-6 py-3 bg-[#0c0c0c]">
          <div>
            <h1 className="text-2xl font-medium text-white leading-tight">
              Agency Brands
            </h1>
            <p className="text-sm font-light text-[#8a8a8a]">
              Manage and switch between your brand accounts
            </p>
          </div>
          <div id="header-actions">
            {/* Action buttons will be rendered here by page components */}
          </div>
        </header>
        <main className="flex-1 overflow-auto bg-[#0c0c0c]">{children}</main>
      </div>
    </div>
  );
}
