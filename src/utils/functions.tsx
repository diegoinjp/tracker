export const formatCurrency = (amount: number) => {
  return amount.toLocaleString('ja-JP', { style: 'currency', currency: 'JPY' })
}
