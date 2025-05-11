export const formatNumber = (number: number | undefined) =>
  number ? parseFloat(number?.toFixed(2)) : 0;
