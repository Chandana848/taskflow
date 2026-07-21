import { ToastProvider, useToast } from '@/components/ui/Toast';

describe('Toast System', () => {
  it('exports provider and hook', () => {
    expect(typeof ToastProvider).toBe('function');
    expect(typeof useToast).toBe('function');
  });
});
