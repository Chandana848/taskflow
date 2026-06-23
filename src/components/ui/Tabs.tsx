'use client';

import { useState, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface Tab {
  id: string;
  label: string;
  content: ReactNode;
}

export function Tabs({ tabs, defaultTab }: { tabs: Tab[]; defaultTab?: string }) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  return (
    <div className="w-full space-y-4">
      <div role="tablist" className="flex border-b border-border gap-2">
        {tabs.map((tab) => {
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={active}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'px-4 py-2 text-sm font-medium border-b-2 transition-colors -mb-px',
                active
                  ? 'border-primary text-primary font-bold'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      <div role="tabpanel">{tabs.find((t) => t.id === activeTab)?.content}</div>
    </div>
  );
}
