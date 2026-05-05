import { EpageDescriptions } from '@data/enums/EpageDescriptions';
import { EPageTitles } from '@data/enums/EPageTitles';
import { Button } from '@mui/material';
import { Link } from '@tanstack/react-router';
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

      {/* BOTÃO TEMPORÁRIO PARA TESTAR A NAVEGAÇÃO */}
      <Button
        component={Link}
        to="/vendedores/reuniões/m1a2b3c4-d5e6-7890-1234-56789abcdef0"
        variant="contained"
        color="primary"
        sx={{ mt: 4 }}
      >
        IR PARA A TELA DE DETALHE (TESTE)
      </Button>
    </PageContainter>
  );
};
