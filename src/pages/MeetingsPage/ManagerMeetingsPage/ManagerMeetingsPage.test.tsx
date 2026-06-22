import { EPageTitles } from '@data/enums/EPageTitles';
import { render, screen } from '@tests/testUtils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@services/queries/useMeetings', () => ({
  useGetMeetings: vi.fn(),
}));

vi.mock('@services/queries/useSalesmen', () => ({
  useGetSalesmen: vi.fn(),
}));

vi.mock('@tanstack/react-router', async () => {
  const actual = await vi.importActual<typeof import('@tanstack/react-router')>(
    '@tanstack/react-router'
  );

  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

import { useGetMeetings } from '@services/queries/useMeetings';
import { useGetSalesmen } from '@services/queries/useSalesmen';

import { ManagerMeetingsPage } from './ManagerMeetingsPage';

const mockUseGetMeetings = useGetMeetings as ReturnType<typeof vi.fn>;
const mockUseGetSalesmen = useGetSalesmen as ReturnType<typeof vi.fn>;

const mockMeetings = [
  {
    id: 'meeting-1',
    title: 'Reunião de descoberta',
    sellerName: 'Ana Silva',
    companyName: 'Acme Ltda',
    date: '2026-05-20T10:00:00Z',
    durationMinutes: 40,
    status: 'COMPLETED',
  },
  {
    id: 'meeting-2',
    title: 'Demonstração comercial',
    sellerName: 'Bruno Souza',
    companyName: 'Beta SA',
    date: '2026-05-21T10:00:00Z',
    durationMinutes: 30,
    status: 'SCHEDULED',
  },
];

describe('ManagerMeetingsPage', () => {
  beforeEach(() => {
    mockUseGetMeetings.mockReturnValue({
      data: {
        content: mockMeetings,
        totalElements: mockMeetings.length,
        summary: {
          total_meetings: 12,
          average_duration_seconds: 2700,
          success_rate: 0.83,
        },
      },
      isLoading: false,
    });
    mockUseGetSalesmen.mockReturnValue({
      data: {
        content: [
          {
            id: 'salesman-1',
            name: 'Ana Silva',
            email: 'ana@example.com',
            company: { id: 'company-1', name: 'Acme Ltda' },
            active: true,
          },
          {
            id: 'salesman-2',
            name: 'Bruno Souza',
            email: 'bruno@example.com',
            company: { id: 'company-2', name: 'Beta SA' },
            active: true,
          },
        ],
      },
      isLoading: false,
    });
  });

  it('renders meetings title', () => {
    render(<ManagerMeetingsPage />);
    expect(screen.getByText(EPageTitles.MEETINGS)).toBeInTheDocument();
  });

  it('renders manager meeting stat cards', () => {
    render(<ManagerMeetingsPage />);

    expect(screen.getByText('Total de reuniões')).toBeInTheDocument();
    expect(screen.getByText('Duração média')).toBeInTheDocument();
    expect(screen.getByText('Sentimento médio')).toBeInTheDocument();
    expect(screen.getByText('12')).toBeInTheDocument();
    expect(screen.getByText('45 min')).toBeInTheDocument();
    expect(screen.getByText('83%')).toBeInTheDocument();
  });

  it('renders meetings table with manager columns and rows', () => {
    render(<ManagerMeetingsPage />);

    expect(screen.getByText('Lista de reuniões')).toBeInTheDocument();
    expect(screen.getByText('Reunião')).toBeInTheDocument();
    expect(screen.getByText('Vendedor')).toBeInTheDocument();
    expect(screen.getByText('Empresa')).toBeInTheDocument();
    expect(screen.getByText('Data')).toBeInTheDocument();
    expect(screen.getByText('Duração')).toBeInTheDocument();
    expect(screen.getByText('Reunião de descoberta')).toBeInTheDocument();
    expect(screen.getByText('Ana Silva')).toBeInTheDocument();
    expect(screen.getByText('Acme Ltda')).toBeInTheDocument();
  });

  it('loads salesman filter options', () => {
    render(<ManagerMeetingsPage />);

    expect(mockUseGetSalesmen).toHaveBeenCalledWith(0, 100, {});
    expect(
      screen.getByLabelText('Filtrar reuniões por vendedor')
    ).toBeInTheDocument();
  });
});
