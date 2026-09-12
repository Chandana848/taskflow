import { render, screen } from '@testing-library/react';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

describe('Breadcrumb Component', () => {
  it('renders breadcrumb links and active leaf', () => {
    const items = [
      { label: 'Workspaces', href: '/workspaces' },
      { label: 'TaskFlow', href: '/workspaces/1' },
      { label: 'Sprint 1' }
    ];
    render(<Breadcrumb items={items} />);
    expect(screen.getByText('Workspaces')).toBeInTheDocument();
    expect(screen.getByText('Sprint 1')).toBeInTheDocument();
  });
});
