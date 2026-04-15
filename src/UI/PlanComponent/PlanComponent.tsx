import { EPlan } from '@data/enums/EPlan';
import type { TPlan } from '@declarations/ui';
import Radio from '@mui/material/Radio';
import { PlanBadge } from '@UI/PlanBadge/PlanBadge';
import type { ChangeEvent, JSX } from 'react';
import { useState } from 'react';

import {
  StyledPlanFormControl,
  StyledPlanFormLabel,
  StyledPlanOption,
  StyledPlanRadioGroup,
} from './PlanComponent.style';

const PLAN_OPTIONS = [EPlan.BASIC, EPlan.PRO, EPlan.ENTERPRISE] as const;

interface IPlanComponentProps {
  name?: string;
  label?: string;
  value?: TPlan;
  defaultValue?: TPlan;
  onChange?: (value: TPlan) => void;
}

export const PlanComponent = ({
  name = 'plan',
  label = 'Plano',
  value,
  defaultValue = EPlan.BASIC,
  onChange,
}: IPlanComponentProps): JSX.Element => {
  const [internalValue, setInternalValue] = useState<TPlan>(defaultValue);
  const selectedPlan = value ?? internalValue;
  const labelId = `${name}-label`;

  const handlePlanChange = (
    _event: ChangeEvent<HTMLInputElement>,
    nextValue: string
  ): void => {
    const nextPlan = nextValue as TPlan;

    if (value === undefined) {
      setInternalValue(nextPlan);
    }

    onChange?.(nextPlan);
  };

  return (
    <StyledPlanFormControl>
      <StyledPlanFormLabel id={labelId}>{label}</StyledPlanFormLabel>

      <StyledPlanRadioGroup
        row
        aria-labelledby={labelId}
        name={name}
        value={selectedPlan}
        onChange={handlePlanChange}
      >
        {PLAN_OPTIONS.map((plan) => (
          <StyledPlanOption
            key={plan}
            value={plan}
            control={<Radio />}
            label={<PlanBadge plan={plan} />}
          />
        ))}
      </StyledPlanRadioGroup>
    </StyledPlanFormControl>
  );
};
