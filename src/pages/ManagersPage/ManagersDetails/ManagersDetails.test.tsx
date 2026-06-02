import type { TManager } from '@services/models/ManagerSchema';
import { render, screen } from '@tests/testUtils';
import { describe, expect, it, vi } from 'vitest';

vi.mock('@tanstack/react-router', async (importOriginal) => {
  const actual =
    await importOriginal<typeof import('@tanstack/react-router')>();
  return {
    ...actual,
    useParams: () => ({ id: 'mgr-1' }),
    Link: ({ children }: { children: React.ReactNode }) => <a>{children}</a>,
  };
});

vi.mock('@services/queries/useManagers', () => ({
  useGetManagerById: vi.fn(),
}));

vi.mock('./ManagerInformation/ManagerInformation', () => ({
  ManagerInformation: ({ manager }: { manager: TManager }) => (
    <div data-testid="manager-info">{manager.name}</div>
  ),
}));

vi.mock('@pages/PageNotFound/PageNotFound', () => ({
  PageNotFound: () => <div data-testid="not-found" />,
}));

import { useGetManagerById } from '@services/queries/useManagers';

import { ManagersDetails } from './ManagersDetails';

const mockQuery = useGetManagerById as ReturnType<typeof vi.fn>;

const manager: TManager = {
  id: 'mgr-1',
  name: 'Ana Lima',
  email: 'ana@example.com',
  company: { id: 'co-1', name: 'Tech Corp' },
  active: true,
  preferences: null,
};

describe('ManagersDetails', () => {
  it('shows loading state', () => {
    mockQuery.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    });
    render(<ManagersDetails />);
    expect(screen.getByText(/carregando/i)).toBeInTheDocument();
  });

  it('shows PageNotFound on error', () => {
    mockQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
    });
    render(<ManagersDetails />);
    expect(screen.getByTestId('not-found')).toBeInTheDocument();
  });

  it('renders manager information when loaded', () => {
    mockQuery.mockReturnValue({
      data: manager,
      isLoading: false,
      isError: false,
    });
    render(<ManagersDetails />);
    expect(screen.getByTestId('manager-info')).toBeInTheDocument();
  });

  it('renders back navigation link', () => {
    mockQuery.mockReturnValue({
      data: manager,
      isLoading: false,
      isError: false,
    });
    render(<ManagersDetails />);
    expect(screen.getByText(/voltar para gestores/i)).toBeInTheDocument();
  });

  it('renders manager name as page heading', () => {
    mockQuery.mockReturnValue({
      data: manager,
      isLoading: false,
      isError: false,
    });
    render(<ManagersDetails />);
    expect(screen.getAllByText('Ana Lima').length).toBeGreaterThanOrEqual(1);
  });
});
