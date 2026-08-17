'use client';

import { Modal, Kbd } from '@/components/ui';

export function KeyboardShortcutsModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const shortcuts = [
    { key: 'Ctrl + K', action: 'Open Global Command Palette' },
    { key: 'C', action: 'Create New Task' },
    { key: 'ESC', action: 'Close Modal or Drawer' },
    { key: 'G then W', action: 'Go to Workspaces' },
    { key: 'G then P', action: 'Go to Projects' },
    { key: '?', action: 'Show Keyboard Shortcuts' },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Keyboard Shortcuts">
      <div className="space-y-3 pt-2">
        {shortcuts.map((s) => (
          <div key={s.action} className="flex justify-between items-center text-sm py-1.5 border-b">
            <span className="text-muted-foreground">{s.action}</span>
            <Kbd>{s.key}</Kbd>
          </div>
        ))}
      </div>
    </Modal>
  );
}
