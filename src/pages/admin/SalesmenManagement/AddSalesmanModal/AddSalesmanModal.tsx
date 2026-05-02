import type { SelectChangeEvent } from '@mui/material';
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Switch,
  TextField,
} from '@mui/material';
import type { TSalesmanWithCompany } from '@services/models/SalesmanSchema';
import { useGetCompanies } from '@services/queries/useCompanies';
import { useCreateSalesman } from '@services/queries/useSalesman';
import { salesmenQueryKeys } from '@services/queries/useSalesman';
import { useQueryClient } from '@tanstack/react-query';
import AppModal from '@UI/AppModal/AppModal';
import React, { useState } from 'react';

interface AddSalesmanModalProps {
  open: boolean;
  handleClose: () => void;
}

interface FormData {
  name: string;
  email: string;
  companyId: string;
  isActive: boolean;
}

interface FormErrors {
  name?: string;
  email?: string;
  companyId?: string;
}

export function AddSalesmanModal({
  open,
  handleClose,
}: AddSalesmanModalProps): React.JSX.Element {
  const queryClient = useQueryClient();
  const { mutate: createSalesman, isPending } = useCreateSalesman();
  const { data: companies } = useGetCompanies();

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    companyId: '',
    isActive: true,
  });

  const [errors, setErrors] = useState<FormErrors>({});

  function validateEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validate(): boolean {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Nome é obrigatório';
    if (!formData.email.trim()) {
      newErrors.email = 'E-mail é obrigatório';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'E-mail inválido';
    }
    if (!formData.companyId) newErrors.companyId = 'Empresa é obrigatória';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(): void {
    if (!validate()) return;
    createSalesman(
      {
        name: formData.name,
        email: formData.email,
        companyId: formData.companyId,
        active: formData.isActive,
      },
      {
        onSuccess: (): void => {
          void queryClient.invalidateQueries({
            queryKey: salesmenQueryKeys.lists(),
          });
          onClose();
        },
      }
    );
  }

  function onClose(): void {
    setFormData({ name: '', email: '', companyId: '', isActive: true });
    setErrors({});
    handleClose();
  }

  return (
    <AppModal
      modalName="Adicionar vendedor"
      open={open}
      handleClose={onClose}
      handleSubmit={handleSubmit}
      isSaveButtonDisabled={isPending}
    >
      <Stack direction="row" flexWrap="wrap" gap={3} p={2}>
        <TextField
          label="Nome do vendedor"
          InputLabelProps={{ shrink: true }}
          value={formData.name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFormData({ ...formData, name: e.target.value })
          }
          error={!!errors.name}
          helperText={errors.name}
          required
          sx={{ flex: '1 1 45%' }}
        />

        <FormControl
          required
          error={!!errors.companyId}
          sx={{ flex: '1 1 45%' }}
        >
          <InputLabel>Empresa</InputLabel>
          <Select
            value={formData.companyId}
            label="Empresa"
            notched
            onChange={(e: SelectChangeEvent<string>) =>
              setFormData({ ...formData, companyId: e.target.value })
            }
          >
            {companies?.content?.map(
              (company: TSalesmanWithCompany['company']) => (
                <MenuItem key={company.id} value={company.id}>
                  {company.name}
                </MenuItem>
              )
            )}
          </Select>
          {errors.companyId && (
            <FormHelperText>{errors.companyId}</FormHelperText>
          )}
          <InputLabel shrink>Empresa</InputLabel>
        </FormControl>

        <TextField
          label="Email de acesso"
          type="email"
          InputLabelProps={{ shrink: true }}
          value={formData.email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFormData({ ...formData, email: e.target.value })
          }
          error={!!errors.email}
          helperText={errors.email}
          required
          sx={{ flex: '1 1 45%' }}
        />

        <FormControlLabel
          sx={{ flex: '1 1 45%', alignSelf: 'center' }}
          control={
            <Switch
              checked={formData.isActive}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData({ ...formData, isActive: e.target.checked })
              }
              color="primary"
            />
          }
          label={formData.isActive ? 'Ativo' : 'Inativo'}
        />
      </Stack>
    </AppModal>
  );
}
