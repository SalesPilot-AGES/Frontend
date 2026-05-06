import { EPageRoutes } from '@data/enums/EPageRoutes';
import { describe, expect, it } from 'vitest';

import { getMenuItems } from './MenuItems';

describe('MenuItems', () => {
  it('returns admin menu items for admin role', () => {
    const items = getMenuItems('admin');
    expect(items).toHaveLength(5);
    expect(items[0].label).toBe('Painel');
    expect(items[0].path).toBe(EPageRoutes.DASHBOARD);
    expect(items[1].label).toBe('Empresas');
    expect(items[1].path).toBe(EPageRoutes.COMPANIES);
    expect(items[2].label).toBe('Gestores');
    expect(items[2].path).toBe(EPageRoutes.MANAGERS);
    expect(items[3].label).toBe('Vendedores');
    expect(items[3].path).toBe(EPageRoutes.SALESMEN);
    expect(items[4].label).toBe('Reuniões');
    expect(items[4].path).toBe(EPageRoutes.MEETINGS);
  });

  it('returns manager menu items for manager role', () => {
    const items = getMenuItems('manager');
    expect(items).toHaveLength(3);
    expect(items[0].label).toBe('Painel');
    expect(items[0].path).toBe(EPageRoutes.DASHBOARD);
    expect(items[1].label).toBe('Vendedores');
    expect(items[1].path).toBe(EPageRoutes.SALESMEN);
    expect(items[2].label).toBe('Reuniões');
    expect(items[2].path).toBe(EPageRoutes.MEETINGS);
  });

  it('returns salesman menu items for salesmen role', () => {
    const items = getMenuItems('salesmen');
    expect(items).toHaveLength(2);
    expect(items[0].label).toBe('Painel');
    expect(items[0].path).toBe(EPageRoutes.DASHBOARD);
    expect(items[1].label).toBe('Reuniões');
    expect(items[1].path).toBe(EPageRoutes.MEETINGS);
  });

  it('includes icon for each menu item', () => {
    const items = getMenuItems('admin');
    items.forEach((item) => {
      expect(item.icon).toBeDefined();
    });
  });
});
