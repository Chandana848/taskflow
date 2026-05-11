import React from 'react';
import Link from 'next/link';
import { ForgotPasswordForm } from '@/components/features/auth/ForgotPasswordForm';

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-muted/30">
      <div className="w-full max-w-md p-8 bg-card border rounded-xl shadow-sm space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">Reset password</h1>
          <p className="text-sm text-muted-foreground">Enter your email and we&apos;ll send recovery instructions</p>
        </div>
        <ForgotPasswordForm />
        <p className="text-center text-sm text-muted-foreground">
          Remembered your password?{' '}
          <Link href="/login" className="text-primary font-medium hover:underline">
            Back to sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
