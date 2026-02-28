"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");
    setIsSubmitting(true);

    try {
      const response = await login({ email, password });
      setMessage(response.message);

      if (response.user.role === "admin") {
        router.push("/admin");
        return;
      }

      router.push("/");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Login failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f2f3f9] px-4 py-12 sm:px-6">
      <div className="mx-auto w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <Link href="/" className="mb-6 inline-flex items-center gap-2 text-lg font-extrabold text-slate-900">
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-[10px] text-white">
            Q
          </span>
          QuickHire
        </Link>

        <h1 className="text-3xl font-extrabold text-slate-800">Login</h1>
        <p className="mt-2 text-sm text-slate-500">Welcome back! Please sign in to continue.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

        {message ? <p className="mt-4 text-sm text-indigo-600">{message}</p> : null}

        <p className="mt-6 text-center text-sm text-slate-500">
          Don’t have an account? <Link href="/signup" className="font-medium text-indigo-600">Sign up</Link>
        </p>
      </div>
    </main>
  );
}
