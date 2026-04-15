import { EpageDescriptions } from '@data/enums/EpageDescriptions';
import { EPageRoutes } from '@data/enums/EPageRoutes';
import { EPageTitles } from '@data/enums/EPageTitles';
import { Button, Stack } from '@mui/material';
import { MOCK_COMPANY_DETAIL_LINKS } from '@pages/admin/CompaniesManagement/CompanyDetail/mockCompanyDetailData';
import { useNavigate } from '@tanstack/react-router';
import { PageContainter } from '@UI/PageContainer/PageContainer';
import { PageHeader } from '@UI/PageHeader/PageHeader';
import type { JSX } from 'react';

export const AdminCompaniesManagement = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <PageContainter>
      <Stack spacing={3} sx={{ width: '100%', alignSelf: 'flex-start' }}>
        <PageHeader
          title={EPageTitles.COMPANIES}
          subtitle={EpageDescriptions.COMPANIES}
        />
        <Stack direction="row" flexWrap="wrap" gap={2}>
          {MOCK_COMPANY_DETAIL_LINKS.map((item) => (
            <Button
              key={item.companyId}
              variant="contained"
              onClick={() => {
                void navigate({
                  to: EPageRoutes.ADMIN_COMPANY_DETAIL,
                  params: { companyId: item.companyId },
                });
              }}
            >
              {item.label}
            </Button>
          ))}
        </Stack>
      </Stack>
    </PageContainter>
  );
};
