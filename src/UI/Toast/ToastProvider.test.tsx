import { Button } from '@mui/material';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { JSX } from 'react';
import { describe, expect, it } from 'vitest';

import { ToastProvider } from './ToastProvider';
import { useToast } from './useToast';

const ToastConsumer = (): JSX.Element => {
  const { showToast } = useToast();

  return (
    <Button onClick={() => showToast('Mensagem do backend', 'success')}>
      Exibir toast
    </Button>
  );
};

describe('ToastProvider', () => {
  it('renders the toast message in an Alert', async () => {
    const user = userEvent.setup();

    render(
      <ToastProvider>
        <ToastConsumer />
      </ToastProvider>
    );

    await user.click(screen.getByRole('button', { name: 'Exibir toast' }));

    expect(await screen.findByText('Mensagem do backend')).toBeInTheDocument();
  });
});
