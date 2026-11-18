import Link from 'next/link';
import { APP_VERSION, APP_NAME } from '@/lib/version';

export function AppFooter() {
  return (
    <footer className="border-t border-border py-4 px-6 text-xs text-muted-foreground flex flex-col sm:flex-row justify-between items-center gap-2">
      <div className="flex items-center space-x-2">
        <span className="font-semibold text-foreground">{APP_NAME}</span>
        <span className="bg-primary/10 text-primary px-1.5 py-0.5 rounded font-mono">v{APP_VERSION}</span>
      </div>
      <div className="flex items-center space-x-4">
        <Link href="/design-system" className="hover:text-foreground">Design System</Link>
        <Link href="/api/version" className="hover:text-foreground">API</Link>
        <Link href="/api/health" className="hover:text-foreground">Health</Link>
      </div>
    </footer>
  );
}
