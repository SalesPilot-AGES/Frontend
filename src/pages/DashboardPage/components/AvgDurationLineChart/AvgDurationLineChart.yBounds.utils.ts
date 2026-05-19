export type TChartYBounds = {
  min: number;
  max: number;
};

const EQUAL_VALUES_PADDING_RATIO = 0.2;
const RANGE_PADDING_RATIO = 0.15;
const MIN_EQUAL_VALUES_PADDING = 1;

const getBoundValue = (value: number): number => Number(value.toFixed(1));

export const resolveYBounds = (values: number[]): TChartYBounds => {
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);

  if (minValue === maxValue) {
    const padding = Math.max(
      MIN_EQUAL_VALUES_PADDING,
      minValue * EQUAL_VALUES_PADDING_RATIO
    );

    return {
      min: Math.max(0, getBoundValue(minValue - padding)),
      max: getBoundValue(maxValue + padding),
    };
  }

  const range = maxValue - minValue;
  const padding = range * RANGE_PADDING_RATIO;

  return {
    min: Math.max(0, getBoundValue(minValue - padding)),
    max: getBoundValue(maxValue + padding),
  };
};
