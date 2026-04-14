import { ECardLabel } from '@data/enums/ECardLabel';
import { EpageDescriptions } from '@data/enums/EpageDescriptions';
import { EPageTitles } from '@data/enums/EPageTitles';
import { PageContainter } from '@UI/PageContainer/PageContainer';
import { PageHeader } from '@UI/PageHeader/PageHeader';
import { StatCard } from '@UI/StatCard/StatCard';
import type { JSX } from 'react';

export const AdminDashboard = (): JSX.Element => {
  return (
    <PageContainter>
      <PageHeader
        title={EPageTitles.ADMIN_DASHBOARD}
        subtitle={EpageDescriptions.ADMIN_DASHBOARD}
      />
      <StatCard
        iconName="company"
        theme="companies"
        value={4}
        label={ECardLabel.ACTIVE_COMPANIES}
      />
    </PageContainter>
  );
};
