"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { signup } from "@/lib/api";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<"user" | "admin">("user");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    setIsSubmitting(true);

    try {
      await signup({ name, email, password, role });
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setRole("user");
      setMessage("Signup successful. You can now login.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Signup failed");
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

        <h1 className="text-3xl font-extrabold text-slate-800">Sign Up</h1>
        <p className="mt-2 text-sm text-slate-500">Create your account to start using QuickHire.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-700">
              Name
            </label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Your full name"
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

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
              placeholder="Minimum 6 characters"
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <div>
            <label htmlFor="role" className="mb-2 block text-sm font-medium text-slate-700">
              Role
            </label>
            <select
              id="role"
              value={role}
              onChange={(event) => setRole(event.target.value as "user" | "admin")}
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            >
              <option value="user">User (default)</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div>
            <label htmlFor="confirm-password" className="mb-2 block text-sm font-medium text-slate-700">
              Confirm Password
            </label>
            <input
              id="confirm-password"
              type="password"
              required
              minLength={6}
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              placeholder="Re-enter password"
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        {message ? <p className="mt-4 text-sm text-indigo-600">{message}</p> : null}

        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an account? <Link href="/login" className="font-medium text-indigo-600">Login</Link>
        </p>
      </div>
    </main>
  );
}
