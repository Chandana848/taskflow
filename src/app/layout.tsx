import type { Metadata, Viewport } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { ThemeProvider } from '@/components/ui/ThemeProvider';
import '@/app/globals.css';

export const metadata: Metadata = {
  title: {
    default: 'TaskFlow — Project & Task Management',
    template: '%s | TaskFlow',
  },
  description:
    'TaskFlow is a production-quality task and project management platform for teams. Plan, track, and collaborate efficiently.',
  keywords: ['task management', 'project management', 'team collaboration', 'productivity'],
  authors: [{ name: 'Karthika Sai Chandana', url: 'https://github.com/B23CS026' }],
  creator: 'Karthika Sai Chandana',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://taskflow.app',
    siteName: 'TaskFlow',
    title: 'TaskFlow — Project & Task Management',
    description: 'Plan, track, and collaborate on work efficiently.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TaskFlow — Project & Task Management',
    description: 'Plan, track, and collaborate on work efficiently.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
  width: 'device-width',
  initialScale: 1,
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
