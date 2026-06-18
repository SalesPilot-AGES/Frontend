import { EPageTitles } from '@data/enums/EPageTitles';
import { useGetMeetings } from '@services/queries/useMeetings';
import { useNavigate } from '@tanstack/react-router';
import { fireEvent, render, screen } from '@tests/testUtils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { SalesmanMeetingsPage } from './SalesmanMeetingsPage';

vi.mock('@services/queries/useMeetings', () => ({
  useGetMeetings: vi.fn(),
}));

vi.mock('@tanstack/react-router', () => ({
  useNavigate: vi.fn(),
}));

const mockUseGetMeetings = vi.mocked(useGetMeetings);
const mockUseNavigate = vi.mocked(useNavigate);
const mockNavigate = vi.fn();

describe('SalesmanMeetingsPage', () => {
  beforeEach(() => {
    mockNavigate.mockReset();
    mockUseNavigate.mockReturnValue(mockNavigate);
    mockUseGetMeetings.mockReturnValue({
      data: {
        content: [
          {
            id: 'meeting-1',
            title: 'Apresentação do produto',
            sellerName: 'Vendedor',
            clientName: 'Marcelo Yamaguti',
            companyName: 'PUCRS',
            sentiment: 8.6,
            date: '2026-03-20T10:00:00Z',
            durationMinutes: 105,
            status: 'COMPLETED',
          },
        ],
        totalElements: 15,
        summary: {
          total_meetings: 15,
          average_duration_seconds: 2400,
          success_rate: 0.9,
        },
      },
      isLoading: false,
    } as ReturnType<typeof useGetMeetings>);
  });

  it('renders meetings title', () => {
    render(<SalesmanMeetingsPage />);
    expect(screen.getByText(EPageTitles.MEETINGS)).toBeInTheDocument();
  });

  it('renders salesman stats and columns without seller filter', () => {
    render(<SalesmanMeetingsPage />);

    expect(screen.getByText('15')).toBeInTheDocument();
    expect(screen.getByText('40 min')).toBeInTheDocument();
    expect(screen.getByText('90%')).toBeInTheDocument();
    expect(screen.getByText('Cliente')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
    expect(screen.getByText('Sentimento')).toBeInTheDocument();
    expect(screen.queryByText('Vendedor')).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/filtrar/i)).not.toBeInTheDocument();
  });

  it('searches by meeting title and navigates to details', () => {
    render(<SalesmanMeetingsPage />);

    fireEvent.change(screen.getByLabelText('Buscar reunião'), {
      target: { value: 'produto' },
    });
    fireEvent.click(screen.getByLabelText('Ver detalhes de meeting-1'));

    expect(mockUseGetMeetings).toHaveBeenLastCalledWith(0, 20, {
      search: 'produto',
    });
    expect(mockNavigate).toHaveBeenCalledWith({
      to: '/reuniões/$meetingId',
      params: { meetingId: 'meeting-1' },
    });
  });
});
