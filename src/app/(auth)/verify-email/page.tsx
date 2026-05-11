'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');

  useEffect(() => {
    if (!token) {
      setStatus('error');
      return;
    }
    fetch('/api/auth/verify-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    })
      .then((res) => {
        if (res.ok) setStatus('success');
        else setStatus('error');
      })
      .catch(() => setStatus('error'));
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-muted/30">
      <div className="w-full max-w-md p-8 bg-card border rounded-xl shadow-sm text-center space-y-4">
        {status === 'verifying' && <p>Verifying your email address...</p>}
        {status === 'success' && (
          <>
            <h2 className="text-xl font-bold text-success">Email Verified!</h2>
            <p className="text-sm text-muted-foreground">Your account has been fully activated.</p>
            <Link href="/login" className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded-md font-medium">
              Continue to Login
            </Link>
          </>
        )}
        {status === 'error' && (
          <>
            <h2 className="text-xl font-bold text-destructive">Verification Failed</h2>
            <p className="text-sm text-muted-foreground">The link is invalid or expired.</p>
            <Link href="/login" className="inline-block text-sm text-primary hover:underline">
              Return to login
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyEmailContent />
    </Suspense>
  );
}
