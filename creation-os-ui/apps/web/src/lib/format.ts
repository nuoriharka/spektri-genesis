export const formatNumber = (n: number, locale: string = "fi-FI") =>
  new Intl.NumberFormat(locale).format(n)

export const formatPercent = (
  value: number, // e.g. 0.985 for 98.5%
  locale: string = "fi-FI",
  fractionDigits: number = 1
) =>
  new Intl.NumberFormat(locale, {
    style: "percent",
    maximumFractionDigits: fractionDigits,
    minimumFractionDigits: fractionDigits,
  }).format(value)

export const formatCurrency = (
  amount: number,
  currency: string = "EUR",
  locale: string = "fi-FI",
  fractionDigits: number = 0
) =>
  new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: fractionDigits,
    minimumFractionDigits: fractionDigits,
  }).format(amount)
