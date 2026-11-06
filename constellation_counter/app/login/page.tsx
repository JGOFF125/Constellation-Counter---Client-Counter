"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SparkBrand from "@/app/components/SparkBrand";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    // I use this account for local testing
    const testEmail = "test@example.com";
    const testPassword = "password123";

    // I added a short delay for the demo login
    await new Promise((resolve) => setTimeout(resolve, 300));

    if (email.trim().toLowerCase() !== testEmail || password !== testPassword) {
      setError("Invalid Email or Password");
      setLoading(false);
      return;
    }

    setLoading(false);
    router.push("/dashboard");
  }

  return (
    <div className="login-page">
      <section className="login-story" aria-label="About Constellation Counter">
        <SparkBrand className="story-star" />
        <p className="eyebrow">CONSTELLATION COUNTER</p>
        <h1>
          More insight
          <br />
          More possibility
        </h1>
        <p>A shared view of attendance</p>
      </section>
      <section className="login-form-area">
        <div className="login-card">
          <p className="eyebrow">WELCOME TO THE PROTOTYPE</p>
          <h2>Take a look inside</h2>
          <p>Use the demo account to explore the planned dashboard</p>
          {error && (
            <p className="login-error" role="alert">
              {error}
            </p>
          )}
          <form onSubmit={submit}>
            <label>
              Email
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                placeholder="test@example.com"
              />
            </label>
            <label>
              Password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                placeholder="Enter demo password"
              />
            </label>
            <button type="submit" disabled={loading}>
              {loading ? "Logging in" : "Open dashboard →"}
            </button>
          </form>
          <div className="login-help">
            <strong>Demo account</strong>
            <br />
            test@example.com / password123
            <br />
            Local testing only \ Real authentication is not connected yet
          </div>
        </div>
      </section>
    </div>
  );
}
