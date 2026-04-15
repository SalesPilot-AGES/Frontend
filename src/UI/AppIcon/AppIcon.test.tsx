import { render } from '@tests/testUtils';
import { GetAppIcon } from '@UI/AppIcon/AppIcon';
import { describe, expect, it } from 'vitest';

describe('AppIcon Component', () => {
  it('returns ElectricBoltIcon for logo', () => {
    const icon = GetAppIcon('logo');
    const { container } = render(icon);
    expect(
      container.querySelector('[data-testid="ElectricBoltIcon"]')
    ).toBeInTheDocument();
  });

  it('returns DashboardIcon for dashboard', () => {
    const icon = GetAppIcon('dashboard');
    const { container } = render(icon);
    expect(
      container.querySelector('[data-testid="DashboardIcon"]')
    ).toBeInTheDocument();
  });

  it('returns ApartmentIcon for company', () => {
    const icon = GetAppIcon('company');
    const { container } = render(icon);
    expect(
      container.querySelector('[data-testid="ApartmentIcon"]')
    ).toBeInTheDocument();
  });

  it('returns ManageAccountsIcon for manager', () => {
    const icon = GetAppIcon('manager');
    const { container } = render(icon);
    expect(
      container.querySelector('[data-testid="ManageAccountsIcon"]')
    ).toBeInTheDocument();
  });

  it('returns PersonIcon for salesman', () => {
    const icon = GetAppIcon('salesman');
    const { container } = render(icon);
    expect(
      container.querySelector('[data-testid="PersonIcon"]')
    ).toBeInTheDocument();
  });

  it('returns EventNoteIcon for meeting', () => {
    const icon = GetAppIcon('meeting');
    const { container } = render(icon);
    expect(
      container.querySelector('[data-testid="EventNoteIcon"]')
    ).toBeInTheDocument();
  });

  it('returns LoginIcon for login', () => {
    const icon = GetAppIcon('login');
    const { container } = render(icon);
    expect(
      container.querySelector('[data-testid="LoginIcon"]')
    ).toBeInTheDocument();
  });

  it('returns LogoutIcon for logout', () => {
    const icon = GetAppIcon('logout');
    const { container } = render(icon);
    expect(
      container.querySelector('[data-testid="LogoutIcon"]')
    ).toBeInTheDocument();
  });
});
