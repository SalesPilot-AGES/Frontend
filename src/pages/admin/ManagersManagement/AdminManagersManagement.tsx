import { EpageDescriptions } from '@data/enums/EpageDescriptions';
import { EPageTitles } from '@data/enums/EPageTitles';
import { PageContainter } from '@UI/PageContainer/PageContainer';
import { PageHeader } from '@UI/PageHeader/PageHeader';
import type { JSX } from 'react';

import { AddManagerModal } from './AddManagerModal/AddManagerModal';

export const AdminManagersManagement = (): JSX.Element => {
  return (
    <PageContainter>
      <PageHeader
        title={EPageTitles.MANAGERS}
        subtitle={EpageDescriptions.MANAGERS}
      />
      <AddManagerModal />
    </PageContainter>
  );
};
