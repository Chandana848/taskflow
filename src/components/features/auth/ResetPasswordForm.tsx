'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to reset password');

      router.push('/login?reset=success');
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
        <label className="block text-sm font-medium mb-1">New Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded-md bg-background focus:ring-2 focus:ring-primary"
          placeholder="••••••••"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Confirm New Password</label>
        <input
          type="password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded-md bg-background focus:ring-2 focus:ring-primary"
          placeholder="••••••••"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
      >
        {loading ? 'Resetting password...' : 'Update Password'}
      </button>
    </form>
  );
}
