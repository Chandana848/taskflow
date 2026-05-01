'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center space-y-4">
        <h3 className="text-lg font-semibold">Check your inbox</h3>
        <p className="text-sm text-muted-foreground">
          If an account exists for {email}, you will receive a password reset link shortly.
        </p>
        <Link href="/login" className="inline-block text-sm text-primary font-medium hover:underline">
          Return to sign in
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Email address</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border rounded-md bg-background focus:ring-2 focus:ring-primary"
          placeholder="you@company.com"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
      >
        {loading ? 'Sending link...' : 'Send Reset Link'}
      </button>
    </form>
  );
}
