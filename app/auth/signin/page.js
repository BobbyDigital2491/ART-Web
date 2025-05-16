"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setError(error.message);
    } else {
      router.push("/AR");
    }
  };

  const handleGoogleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: "http://localhost:3000/api/auth/callback" },
    });
    if (error) {
      setError(error.message);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl text-white font-bold mb-4">ARt Emerged</h1>
      <form onSubmit={handleEmailSignIn} className="w-full max-w-sm">
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
          Sign In
        </button>
      </form>
      <button
        onClick={handleGoogleSignIn}
        className="mt-4 p-2 bg-red-500 text-white rounded"
      >
        Sign In with Google
      </button>
      <p className="mt-4">
        Don&apos;t have an account?{" "}
        <a href="/auth/signup" className="text-blue-500">
          Sign Up
        </a>
      </p>
    </main>
  );
}