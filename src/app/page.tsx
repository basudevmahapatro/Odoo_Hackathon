import { redirect } from "next/navigation";

import { SignOutButton } from "~/components/auth/SignOutButton";
import { getSession } from "~/server/better-auth/server";

export default async function Home() {
  const session = await getSession();

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Welcome, {session.user.name}</h1>
        <SignOutButton />
      </div>
    </main>
  );
}
