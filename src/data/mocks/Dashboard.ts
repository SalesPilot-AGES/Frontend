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
