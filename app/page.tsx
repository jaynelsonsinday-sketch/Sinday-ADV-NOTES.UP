"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalizedEmail = email.trim();

    if (!normalizedEmail) {
      setError("Please enter your email address.");
      return;
    }

    if (!/^[^\s@]+@gmail\.com$/i.test(normalizedEmail)) {
      setError("Please use a valid Gmail address ending in @gmail.com.");
      return;
    }

    if (password.length < 8) {
      setError("Your password must be at least 8 characters.");
      return;
    }

    setError("");
    router.push("/notes");
  }

  return (
    <main className="login-page">
      <section className="login-card" aria-labelledby="welcome-heading">
        <div className="brand">
          <span className="brand-mark" aria-hidden="true">n.</span>
          <span>noteup</span>
        </div>

        <div className="login-intro">
          <p className="eyebrow">A little space for your thoughts</p>
          <h1 id="welcome-heading">Make room<br />for what matters.</h1>
          <p className="intro-copy">
            Your ideas, plans, and little reminders — all in one calm place.
          </p>
        </div>

        <form className="login-form" onSubmit={handleSubmit} noValidate>
          <label htmlFor="email">Email address</label>
          <input
            autoComplete="email"
            id="email"
            inputMode="email"
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@gmail.com"
            type="text"
            value={email}
          />

          <label htmlFor="password">Password</label>
          <input
            autoComplete="current-password"
            id="password"
            onChange={(event) => setPassword(event.target.value)}
            placeholder="At least 8 characters"
            type="password"
            value={password}
          />

          <button className="primary-button" type="submit">Continue to your notes <span aria-hidden="true">↗</span></button>
          {error && <p className="form-error" role="alert">{error}</p>}
        </form>

        <p className="login-footnote">Demo sign-in only · No account needed</p>
      </section>

      <aside className="login-art" aria-label="A quiet desk with a notebook">
        <div className="art-topline"><span>YOUR MIND, UNCLUTTERED</span><span>01 / 01</span></div>
        <div className="art-sun" aria-hidden="true" />
        <div className="art-note">
          <span className="note-date">A NOTE TO SELF</span>
          <span className="note-script">One thing<br />at a time.</span>
          <span className="note-spark" aria-hidden="true">✳</span>
        </div>
        <div className="art-caption">
          <span className="caption-dot" />
          <p>Good thoughts deserve<br />a place to land.</p>
        </div>
        <span className="art-decoration decoration-one" aria-hidden="true">✳</span>
        <span className="art-decoration decoration-two" aria-hidden="true">✦</span>
      </aside>
    </main>
  );
}
