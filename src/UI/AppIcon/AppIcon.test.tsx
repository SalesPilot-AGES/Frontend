import { render } from '@tests/testUtils';
import { getAppIcon } from '@UI/AppIcon/AppIcon';
import { describe, expect, it } from 'vitest';

describe('AppIcon Component', () => {
  it('returns ElectricBoltIcon for logo', () => {
    const icon = getAppIcon('logo');
    const { container } = render(icon);
    expect(
      container.querySelector('[data-testid="ElectricBoltIcon"]')
    ).toBeInTheDocument();
  });

  it('returns DashboardIcon for dashboard', () => {
    const icon = getAppIcon('dashboard');
    const { container } = render(icon);
    expect(
      container.querySelector('[data-testid="DashboardIcon"]')
    ).toBeInTheDocument();
  });

  it('returns ApartmentIcon for company', () => {
    const icon = getAppIcon('company');
    const { container } = render(icon);
    expect(
      container.querySelector('[data-testid="ApartmentIcon"]')
    ).toBeInTheDocument();
  });

  it('returns ManageAccountsIcon for manager', () => {
    const icon = getAppIcon('manager');
    const { container } = render(icon);
    expect(
      container.querySelector('[data-testid="ManageAccountsIcon"]')
    ).toBeInTheDocument();
  });

  it('returns PersonIcon for salesman', () => {
    const icon = getAppIcon('salesman');
    const { container } = render(icon);
    expect(
      container.querySelector('[data-testid="PersonIcon"]')
    ).toBeInTheDocument();
  });

  it('returns EventNoteIcon for meeting', () => {
    const icon = getAppIcon('meeting');
    const { container } = render(icon);
    expect(
      container.querySelector('[data-testid="EventNoteIcon"]')
    ).toBeInTheDocument();
  });

  it('returns LoginIcon for login', () => {
    const icon = getAppIcon('login');
    const { container } = render(icon);
    expect(
      container.querySelector('[data-testid="LoginIcon"]')
    ).toBeInTheDocument();
  });

  it('returns LogoutIcon for logout', () => {
    const icon = getAppIcon('logout');
    const { container } = render(icon);
    expect(
      container.querySelector('[data-testid="LogoutIcon"]')
    ).toBeInTheDocument();
  });
});
