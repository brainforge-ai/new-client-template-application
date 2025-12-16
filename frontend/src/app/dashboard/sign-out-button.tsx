"use client";

import { signOut } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function SignOutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <Button
      variant="outline"
      onClick={handleSignOut}
      className="w-full border-[#1e1e1e] text-white hover:bg-[#1e1e1e] hover:text-white"
    >
      Sign Out
    </Button>
  );
}
