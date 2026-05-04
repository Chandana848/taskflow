import React, { Suspense } from 'react';
import { ResetPasswordForm } from '@/components/features/auth/ResetPasswordForm';

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-muted/30">
      <div className="w-full max-w-md p-8 bg-card border rounded-xl shadow-sm space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">Create new password</h1>
          <p className="text-sm text-muted-foreground">Enter your new strong password below</p>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </div>
  );
}
