import { EpageDescriptions } from '@data/enums/EpageDescriptions';
import { EPageTitles } from '@data/enums/EPageTitles';
import { PageContainter } from '@UI/PageContainer/PageContainer';
import { PageHeader } from '@UI/PageHeader/PageHeader';
import type { JSX } from 'react';

export const AdminDashboard = (): JSX.Element => {
  return (
    <PageContainter>
      <PageHeader
        title={EPageTitles.ADMIN_DASHBOARD}
        subtitle={EpageDescriptions.ADMIN_DASHBOARD}
      />
    </PageContainter>
  );
};
