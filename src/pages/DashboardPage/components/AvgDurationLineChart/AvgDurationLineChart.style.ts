import { styled } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';

export const StyledLineChart = styled(LineChart, {
  shouldForwardProp: (prop) => prop !== 'lineColor',
})<{ lineColor: string }>(({ lineColor }) => ({
  '.MuiMarkElement-root': {
    stroke: lineColor,
    strokeWidth: 2,
    fill: lineColor,
  },
  '.MuiMarkElement-root[data-highlighted="true"]': {
    stroke: lineColor,
    fill: lineColor,
    strokeWidth: 3,
  },
}));
