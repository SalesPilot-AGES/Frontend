export const getFilterDateRange = (date: string): string => {
  const d = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const meetingDate = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const diffDays = Math.floor(
    (today.getTime() - meetingDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diffDays === 0) return 'Hoje';
  if (diffDays === 1) return 'Ontem';
  if (diffDays <= 7) return 'Última semana';
  if (diffDays <= 14) return 'Últimas 2 semanas';
  if (diffDays <= 30) return 'Último mês';
  if (diffDays <= 90) return 'Últimos 3 meses';
  if (diffDays <= 180) return 'Últimos 6 meses';
  return 'Mais de 6 meses';
};
