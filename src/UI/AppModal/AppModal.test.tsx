import { fireEvent, render, screen } from '@tests/testUtils';
import { describe, expect, it, vi } from 'vitest';

import { AppModal } from './AppModal';

const defaultProps = {
  modalName: 'Adicionar empresa',
  open: true,
  handleClose: vi.fn(),
  handleSubmit: vi.fn(),
  children: <div data-testid="modal-child">Modal Content</div>,
};

describe('AppModal', () => {
  it('renders modal name in header', () => {
    render(<AppModal {...defaultProps} />);
    expect(screen.getByText('Adicionar empresa')).toBeInTheDocument();
  });

  it('renders children', () => {
    render(<AppModal {...defaultProps} />);
    expect(screen.getByTestId('modal-child')).toBeInTheDocument();
  });

  it('renders Cancelar and Salvar buttons', () => {
    render(<AppModal {...defaultProps} />);
    expect(screen.getByText('Cancelar')).toBeInTheDocument();
    expect(screen.getByText('Salvar')).toBeInTheDocument();
  });

  it('calls handleClose when Cancelar is clicked', () => {
    const handleClose = vi.fn();
    render(<AppModal {...defaultProps} handleClose={handleClose} />);
    fireEvent.click(screen.getByText('Cancelar'));
    expect(handleClose).toHaveBeenCalled();
  });

  it('calls handleSubmit when Salvar is clicked', () => {
    const handleSubmit = vi.fn();
    render(<AppModal {...defaultProps} handleSubmit={handleSubmit} />);
    fireEvent.click(screen.getByText('Salvar'));
    expect(handleSubmit).toHaveBeenCalledOnce();
  });

  it('disables Salvar button when isSaveButtonDisabled is true', () => {
    render(<AppModal {...defaultProps} isSaveButtonDisabled={true} />);
    const saveButtons = screen.getAllByRole('button');
    const salvar = saveButtons.find((b) => b.textContent?.includes('Salvar'));
    expect(salvar).toBeDisabled();
  });

  it('does not render when open is false', () => {
    render(<AppModal {...defaultProps} open={false} />);
    expect(screen.queryByText('Adicionar empresa')).not.toBeInTheDocument();
  });

  it('disables Salvar and Cancelar buttons when isSubmitting is true', () => {
    render(<AppModal {...defaultProps} isSubmitting={true} />);
    const buttons = screen.getAllByRole('button');
    const salvar = buttons.find((b) => b.textContent?.includes('Salvar'));
    const cancelar = buttons.find((b) => b.textContent?.includes('Cancelar'));
    expect(salvar).toBeDisabled();
    expect(cancelar).toBeDisabled();
  });

  it('does not call handleSubmit again when Salvar is clicked while isSubmitting', () => {
    const handleSubmit = vi.fn();
    render(
      <AppModal
        {...defaultProps}
        handleSubmit={handleSubmit}
        isSubmitting={true}
      />
    );
    fireEvent.click(screen.getByText('Salvar'));
    expect(handleSubmit).not.toHaveBeenCalled();
  });
});
