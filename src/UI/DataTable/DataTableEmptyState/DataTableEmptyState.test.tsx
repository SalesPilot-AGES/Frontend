import { Table, TableBody } from '@mui/material';
import { render, screen } from '@tests/testUtils';
import { describe, expect, it } from 'vitest';

import { DataTableEmptyState } from './DataTableEmptyState';

const wrap = (ui: React.ReactElement) => (
  <Table>
    <TableBody>{ui}</TableBody>
  </Table>
);

describe('DataTableEmptyState', () => {
  it('renders empty title', () => {
    render(
      wrap(
        <DataTableEmptyState
          colSpan={4}
          emptyTitle="Nenhuma empresa encontrada"
          emptyDescription="Adicione uma empresa para começar"
          emptyStateIconBg="#eee"
          emptyStateIconFg="#999"
        />
      )
    );
    expect(screen.getByText('Nenhuma empresa encontrada')).toBeInTheDocument();
  });

  it('renders empty description', () => {
    render(
      wrap(
        <DataTableEmptyState
          colSpan={4}
          emptyTitle="Title"
          emptyDescription="Try adding some data"
          emptyStateIconBg="#eee"
          emptyStateIconFg="#999"
        />
      )
    );
    expect(screen.getByText('Try adding some data')).toBeInTheDocument();
  });

  it('renders inbox icon', () => {
    const { container } = render(
      wrap(
        <DataTableEmptyState
          colSpan={3}
          emptyTitle="Title"
          emptyDescription="Desc"
          emptyStateIconBg="#eee"
          emptyStateIconFg="#999"
        />
      )
    );
    expect(container.querySelector('svg')).toBeInTheDocument();
  });
});
