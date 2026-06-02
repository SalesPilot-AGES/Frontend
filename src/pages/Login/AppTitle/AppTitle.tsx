import { EPageTitles } from '@data/enums/EPageTitles';
import { Stack } from '@mui/material';
import { IconBox } from '@UI/IconBox/IconBox';
import { PageHeader } from '@UI/PageHeader/PageHeader';
import type { JSX } from 'react';

export const AppTitle = (): JSX.Element => {
  return (
    <Stack
      sx={{
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
      }}
    >
      <IconBox iconName="logo" />
      <PageHeader title={EPageTitles.LOGIN} subtitle="" alignment="center" />
    </Stack>
  );
};
