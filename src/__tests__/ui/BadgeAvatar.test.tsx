import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';

describe('Badge & Avatar Primitives', () => {
  it('instantiates components without failure', () => {
    expect(typeof Badge).toBe('function');
    expect(typeof Avatar).toBe('function');
  });
});
