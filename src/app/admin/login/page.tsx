"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

function LoginForm() {
  const router = useRouter();
  const search = useSearchParams();
  const next = search.get("next") || "/admin";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setPending(true);
    setError(null);
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    setPending(false);
    if (!res.ok) {
      const data = (await res.json().catch(() => null)) as { error?: string } | null;
      setError(data?.error ?? "Login gagal");
      return;
    }
    router.push(next);
    router.refresh();
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <label>
        Email
        <input
          type="email"
          autoComplete="username"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
        Password
        <input
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      {error ? <p className="error-text">{error}</p> : null}
      <button type="submit" className="btn btn-gold" disabled={pending}>
        {pending ? "Masuk…" : "Masuk"}
      </button>
    </form>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="login-page">
      <div className="login-card">
        <p className="brand-mark" style={{ marginBottom: "1rem" }}>
          <span className="brand-mark__name">Dylanrych</span>
          <span className="brand-mark__tld">.id</span>
        </p>
        <h1>Super Admin</h1>
        <p className="muted" style={{ marginBottom: "1.5rem" }}>
          Panel produk, pesanan, promo, dan laporan.
        </p>
        <Suspense fallback={<p className="muted">Memuat…</p>}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
