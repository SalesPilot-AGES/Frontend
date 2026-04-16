import { EPageRoutes } from '@data/enums/EPageRoutes';
import { EPageTitles } from '@data/enums/EPageTitles';
import type { ManagerMock } from '@data/mocks/Managers';
import { mockManagers } from '@data/mocks/Managers';
import { ArrowBack, Business, Close, Email, Save } from '@mui/icons-material';
import {
  Autocomplete,
  Box,
  Button,
  Switch,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { PageNotFound } from '@pages/PageNotFound/PageNotFound';
import { useNavigate, useParams } from '@tanstack/react-router';
import { EntityDetailsCard } from '@UI/EntityDetailsCard/EntityDetailsCard';
import { IconBox } from '@UI/IconBox/IconBox';
import { ItemDetail } from '@UI/ItemDetail/ItemDetail';
import { PageContainter } from '@UI/PageContainer/PageContainer';
import { PageHeader } from '@UI/PageHeader/PageHeader';
import { StatusBadge } from '@UI/StatusBadge/StatusBadge';
import { useState, type JSX } from 'react';

type TManagerEditForm = {
  name: string;
  companyName: string;
  email: string;
  active: boolean;
};

const createEditForm = (manager: ManagerMock): TManagerEditForm => ({
  name: manager.name,
  companyName: manager.company.name,
  email: manager.email,
  active: manager.active,
});

const companyOptions = Array.from(
  new Set(mockManagers.map((managerItem) => managerItem.company.name))
);

export const AdminManagersDetails = (): JSX.Element => {
  const navigate = useNavigate();
  const { palette } = useTheme();
  const { id } = useParams({ from: EPageRoutes.ADMIN_MANAGERS_DETAILS });

  const manager = mockManagers.find((managerItem) => managerItem.id === id);
  const [managerData, setManagerData] = useState<ManagerMock | undefined>(
    manager
  );
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<TManagerEditForm | null>(
    manager ? createEditForm(manager) : null
  );

  const isCompanyValid = editForm
    ? companyOptions.includes(editForm.companyName)
    : false;
  const isEditFormValid = isCompanyValid;

  const handleGoBack = (): void => {
    navigate({ to: EPageRoutes.ADMIN_MANAGERS });
  };

  const handleEdit = (): void => {
    if (!managerData) {
      return;
    }

    setEditForm(createEditForm(managerData));
    setIsEditing(true);
  };

  const handleCancelEdit = (): void => {
    if (!managerData) {
      return;
    }

    setEditForm(createEditForm(managerData));
    setIsEditing(false);
  };

  const handleSaveEdit = (): void => {
    if (!managerData || !editForm || !isEditFormValid) {
      return;
    }

    setManagerData({
      ...managerData,
      name: editForm.name,
      email: editForm.email,
      active: editForm.active,
      company: {
        ...managerData.company,
        name: editForm.companyName,
      },
    });
    setIsEditing(false);
  };

  const handleFieldChange = (
    field: keyof Omit<TManagerEditForm, 'active'>,
    value: string
  ): void => {
    setEditForm((previous) => {
      if (!previous) {
        return previous;
      }

      return {
        ...previous,
        [field]: value,
      };
    });
  };

  const handleStatusChange = (checked: boolean): void => {
    setEditForm((previous) => {
      if (!previous) {
        return previous;
      }

      return {
        ...previous,
        active: checked,
      };
    });
  };

  if (!managerData) {
    return <PageNotFound />;
  }

  return (
    <PageContainter>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
          width: '100%',
        }}
      >
        <Button
          startIcon={<ArrowBack />}
          onClick={handleGoBack}
          sx={{
            textTransform: 'none',
            color: palette.neutrals[600],
          }}
        >
          Voltar para gestores
        </Button>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
          }}
        >
          <IconBox iconName="manager" theme="managers" />
          <PageHeader title={managerData.name} subtitle="" />
        </Box>

        <EntityDetailsCard
          title={EPageTitles.MANAGER_INFORMATION}
          onEdit={isEditing ? undefined : handleEdit}
          headerRight={
            isEditing ? (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                }}
              >
                <Button
                  variant="outlined"
                  startIcon={<Close />}
                  onClick={handleCancelEdit}
                >
                  Cancelar
                </Button>
                <Button
                  variant="contained"
                  startIcon={<Save />}
                  onClick={handleSaveEdit}
                  disabled={!isEditFormValid}
                >
                  Salvar
                </Button>
              </Box>
            ) : undefined
          }
        >
          {isEditing && editForm ? (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
              }}
            >
              <ItemDetail label="ID do usuário" value={managerData.id} />

              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                  gap: '1.5rem 2rem',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                  }}
                >
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Nome do usuario
                  </Typography>
                  <TextField
                    value={editForm.name}
                    onChange={(event) => {
                      handleFieldChange('name', event.target.value);
                    }}
                    fullWidth
                  />
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                  }}
                >
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Empresa
                  </Typography>
                  <Autocomplete
                    options={companyOptions}
                    value={editForm.companyName}
                    onChange={(_, value) => {
                      handleFieldChange('companyName', value ?? '');
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        error={!isCompanyValid}
                        helperText={
                          isCompanyValid
                            ? undefined
                            : 'Selecione uma empresa da lista.'
                        }
                      />
                    )}
                  />
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                  }}
                >
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Email de acesso
                  </Typography>
                  <TextField
                    value={editForm.email}
                    onChange={(event) => {
                      handleFieldChange('email', event.target.value);
                    }}
                    fullWidth
                  />
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                  }}
                >
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Status
                  </Typography>
                  <Box
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      minHeight: '3rem',
                    }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: 500 }}>
                      {editForm.active ? 'Ativo' : 'Inativo'}
                    </Typography>
                    <Switch
                      checked={editForm.active}
                      onChange={(event) => {
                        handleStatusChange(event.target.checked);
                      }}
                      sx={{
                        '& .MuiSwitch-switchBase.Mui-checked': {
                          color: palette.success[400],
                        },
                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track':
                          {
                            backgroundColor: palette.success[200],
                            opacity: 1,
                          },
                      }}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
          ) : (
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                gap: '2rem 4rem',
              }}
            >
              <ItemDetail label="ID do usuário" value={managerData.id} />

              <ItemDetail
                label="Empresa"
                value={managerData.company.name}
                icon={<Business fontSize="small" />}
              />

              <ItemDetail label="Nome do usuário" value={managerData.name} />

              <ItemDetail label="Status">
                <Box
                  sx={{
                    display: 'inline-flex',
                    alignSelf: 'flex-start',
                  }}
                >
                  <StatusBadge active={managerData.active} />
                </Box>
              </ItemDetail>

              <ItemDetail
                label="Email de acesso"
                value={managerData.email}
                icon={<Email fontSize="small" />}
              />
            </Box>
          )}
        </EntityDetailsCard>
      </Box>
    </PageContainter>
  );
};
