'use client';

import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';

export function RegisterForm() {
  const { login } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || (data.errors && data.errors[0]?.message) || 'Registration failed');
      }

      login('cookie-managed', data.user);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div role="alert" className="p-3 text-sm text-destructive bg-destructive/10 rounded-md">
          {error}
        </div>
      )}
      <div>
        <label className="block text-sm font-medium mb-1">Full Name</label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border rounded-md bg-background focus:ring-2 focus:ring-primary"
          placeholder="Alex Rivera"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Work Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border rounded-md bg-background focus:ring-2 focus:ring-primary"
          placeholder="alex@company.com"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded-md bg-background focus:ring-2 focus:ring-primary"
          placeholder="Minimum 8 characters with letters & numbers"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
      >
        {loading ? 'Creating account...' : 'Create Account'}
      </button>
    </form>
  );
}
