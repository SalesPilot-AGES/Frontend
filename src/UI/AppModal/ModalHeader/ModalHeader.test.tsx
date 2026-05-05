import { fireEvent, render, screen } from '@tests/testUtils';
import { describe, expect, it, vi } from 'vitest';

import { ModalHeader } from './ModalHeader';

describe('ModalHeader', () => {
  it('renders modal name', () => {
    render(<ModalHeader modalName="Adicionar empresa" handleClose={vi.fn()} />);
    expect(screen.getByText('Adicionar empresa')).toBeInTheDocument();
  });

  it('renders close button', () => {
    render(<ModalHeader modalName="Test" handleClose={vi.fn()} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('calls handleClose when close button is clicked', () => {
    const handleClose = vi.fn();
    render(<ModalHeader modalName="Test" handleClose={handleClose} />);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClose).toHaveBeenCalledOnce();
  });
});
