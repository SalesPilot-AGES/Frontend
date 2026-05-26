export type TMockMeetingsByCompany = {
  company_name: string;
  total_meetings: number;
};

export const mockMeetingsByCompany: TMockMeetingsByCompany[] = [
  { company_name: 'Tech Solutions', total_meetings: 128 },
  { company_name: 'Smart Vendas', total_meetings: 115 },
  { company_name: 'Digital Sales', total_meetings: 103 },
  { company_name: 'InovaCorp', total_meetings: 92 },
  { company_name: 'ProVendas', total_meetings: 79 },
];

export type TMockMeetingsBySalesman = {
  salesman_name: string;
  total_meetings: number;
};

export const mockMeetingsBySalesman: TMockMeetingsBySalesman[] = [
  { salesman_name: 'João Silva', total_meetings: 145 },
  { salesman_name: 'Maria Santos', total_meetings: 138 },
  { salesman_name: 'Carlos Oliveira', total_meetings: 127 },
  { salesman_name: 'Ana Costa', total_meetings: 115 },
  { salesman_name: 'Roberto Alves', total_meetings: 98 },
];
