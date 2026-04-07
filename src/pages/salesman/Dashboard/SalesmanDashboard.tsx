import { EpageDescriptions } from '@data/enums/EpageDescriptions';
import { EPageTitles } from '@data/enums/EPageTitles';
import { PageContainter } from '@UI/PageContainer/PageContainer';
import { PageHeader } from '@UI/PageHeader/PageHeader';
import type { JSX } from 'react';

export const SalesmanDashboard = (): JSX.Element => {
  return (
    <PageContainter>
      <PageHeader
        title={EPageTitles.SALESMAN_DASHBOARD}
        subtitle={EpageDescriptions.SALESMAN_DASHBOARD}
      />
    </PageContainter>
  );
};
