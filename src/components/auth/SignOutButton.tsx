"use client";

import { authClient } from "~/server/better-auth/client";

export function SignOutButton() {
  const handleSignOut = async () => {
    await authClient.signOut();
    window.location.href = "/sign-in";
  };

  return (
    <button
      onClick={handleSignOut}
      className="mt-4 border border-black bg-black px-4 py-2 text-sm text-white hover:bg-black/90"
    >
      Sign Out
    </button>
  );
}
