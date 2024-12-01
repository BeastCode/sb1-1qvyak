export const CHART_COLORS = {
  primary: '#4F46E5',
  secondary: '#0088FE',
  success: '#00C49F',
  warning: '#FFBB28',
  danger: '#FF8042',
} as const;

export const CHART_COLOR_SEQUENCE = [
  CHART_COLORS.secondary,
  CHART_COLORS.success,
  CHART_COLORS.warning,
  CHART_COLORS.danger,
] as const;