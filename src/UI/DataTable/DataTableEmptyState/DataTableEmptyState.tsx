import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import { Box, Stack, TableCell, TableRow, Typography } from '@mui/material';
import type { JSX } from 'react';

export interface DataTableEmptyStateProps {
  colSpan: number;
  emptyTitle: string;
  emptyDescription: string;
  emptyStateIconBg: string;
  emptyStateIconFg: string;
}

export const DataTableEmptyState = ({
  colSpan,
  emptyTitle,
  emptyDescription,
  emptyStateIconBg,
  emptyStateIconFg,
}: DataTableEmptyStateProps): JSX.Element => (
  <TableRow>
    <TableCell colSpan={colSpan} sx={{ borderBottom: 'none', py: 6 }}>
      <Stack alignItems="center" spacing={1.5}>
        <Box
          sx={{
            alignItems: 'center',
            backgroundColor: emptyStateIconBg,
            borderRadius: '999px',
            color: emptyStateIconFg,
            display: 'inline-flex',
            height: 56,
            justifyContent: 'center',
            width: 56,
          }}
        >
          <InboxOutlinedIcon />
        </Box>
        <Typography variant="subtitle1" fontWeight={700} color="text.primary">
          {emptyTitle}
        </Typography>
        <Typography variant="body2" color="text.secondary" textAlign="center">
          {emptyDescription}
        </Typography>
      </Stack>
    </TableCell>
  </TableRow>
);
