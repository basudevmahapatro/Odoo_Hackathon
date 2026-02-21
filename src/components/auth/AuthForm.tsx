"use client";

import { useState, type FormEvent } from "react";
import { authClient } from "~/server/better-auth/client";

type AuthMode = "signin" | "register";

interface FormData {
  email: string;
  password: string;
  name: string;
}

export function AuthForm() {
  const [mode, setMode] = useState<AuthMode>("signin");
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    name: "",
  });
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const toggleMode = () => {
    setMode((prev) => (prev === "signin" ? "register" : "signin"));
    setError("");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (mode === "register") {
        const result = await authClient.signUp.email({
          email: formData.email,
          password: formData.password,
          name: formData.name,
        });

        if (result.error) {
          setError(result.error.message ?? "Registration failed");
        } else {
          window.location.href = "/";
        }
      } else {
        const result = await authClient.signIn.email({
          email: formData.email,
          password: formData.password,
        });

        if (result.error) {
          setError(result.error.message ?? "Sign in failed");
        } else {
          window.location.href = "/";
        }
      }
    } catch {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4">
      <div className="w-full max-w-md space-y-8 border border-black p-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-black">
            {mode === "signin" ? "Sign In" : "Create Account"}
          </h1>
          <p className="mt-2 text-sm text-black/60">
            {mode === "signin"
              ? "Enter your credentials to access your account"
              : "Fill in your details to get started"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {mode === "register" && (
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-black"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="mt-1 block w-full border border-black px-3 py-2 text-black placeholder-black/40 focus:border-black focus:ring-1 focus:ring-black focus:outline-none"
                placeholder="John Doe"
              />
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-black"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="mt-1 block w-full border border-black px-3 py-2 text-black placeholder-black/40 focus:border-black focus:ring-1 focus:ring-black focus:outline-none"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-black"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              className="mt-1 block w-full border border-black px-3 py-2 text-black placeholder-black/40 focus:border-black focus:ring-1 focus:ring-black focus:outline-none"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="border border-black bg-black/5 px-4 py-3 text-sm text-black">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full cursor-pointer border border-black bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-black/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading
              ? "Loading..."
              : mode === "signin"
                ? "Sign In"
                : "Create Account"}
          </button>
        </form>

        <div className="border-t border-black pt-6 text-center">
          <p className="text-sm text-black/60">
            {mode === "signin"
              ? "Don't have an account?"
              : "Already have an account?"}
            <button
              type="button"
              onClick={toggleMode}
              className="ml-2 cursor-pointer font-medium text-black underline hover:no-underline"
            >
              {mode === "signin" ? "Register" : "Sign In"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
