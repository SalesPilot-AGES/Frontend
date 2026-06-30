import type { TMeetingDetail } from '@services/models/MeetingSchema';
import { render, screen } from '@tests/testUtils';
import { describe, expect, it, vi } from 'vitest';

import { MeetingDetailHeaderStats } from './MeetingDetailHeaderStats';

vi.mock('@tanstack/react-router', () => ({
  Link: 'a',
}));

const mockMeeting: TMeetingDetail = {
  id: 'meeting-1',
  title: 'Reunião de descoberta',
  status: 'SCHEDULED',
  meeting_type: 'ONLINE',
  objective: 'Entender dores e objetivos',
  client_needs: 'Melhorar eficiência',
  previous_interactions: 'Contato inicial via email',
  competitors_involved: 'Concorrente X',
  scheduled_for: '2026-05-04T14:21:48.07065',
  started_at: null,
  ended_at: null,
  duration_seconds: 1800,
  seller: {
    id: 'seller-1',
    name: 'Saulo Souza',
    email: 'saulo@digitalsales.com',
  },
  client: {
    id: 'client-1',
    name: 'Marina Lima',
    client_company_name: 'Alfa Industrial',
    sector: 'Manufacturing',
    overall_sentiment: 8,
  },
};

describe('MeetingDetailHeaderStats', () => {
  it('renders meeting title and status', () => {
    render(
      <MeetingDetailHeaderStats meeting={mockMeeting} sentimentScore={0.9} />
    );

    expect(screen.getByText('Reunião de descoberta')).toBeInTheDocument();
    expect(screen.getByText('Agendada')).toBeInTheDocument();
  });
});
