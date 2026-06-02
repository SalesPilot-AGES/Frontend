import { EpageDescriptions } from '@data/enums/EpageDescriptions';
import { EPageTitles } from '@data/enums/EPageTitles';
import { PageContainter } from '@UI/PageContainer/PageContainer';
import { PageHeader } from '@UI/PageHeader/PageHeader';
import type { JSX } from 'react';

export const SalesmanMeetingsPage = (): JSX.Element => {
  return (
    <PageContainter>
      <PageHeader
        title={EPageTitles.MEETINGS}
        subtitle={EpageDescriptions.MEETINGS}
      />
    </PageContainter>
  );
};
