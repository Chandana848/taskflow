export class EmailService {
  async sendVerificationEmail(email: string, token: string): Promise<boolean> {
    const link = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/verify-email?token=${token}`;
    console.log(`[EMAIL SERVICE] Verification email sent to ${email}: ${link}`);
    return true;
  }

  async sendPasswordResetEmail(email: string, token: string): Promise<boolean> {
    const link = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/reset-password?token=${token}`;
    console.log(`[EMAIL SERVICE] Password reset email sent to ${email}: ${link}`);
    return true;
  }
}

export const emailService = new EmailService();
