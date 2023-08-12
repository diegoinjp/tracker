export const formatCurrency = (amount: number) => {
  return amount.toLocaleString('ja-JP', { style: 'currency', currency: 'JPY' })
}

export const capitalize = (s: string) => {
  return s.charAt(0).toUpperCase() + s.slice(1)
}
