import { createSignal, createEffect } from 'solid-js'
import { Transaction } from '~/services/domain'

export default function useCheckTransaction(transactions: Transaction[]) {
  const [income, setIncome] = createSignal<number>(0)
  const [expense, setExpense] = createSignal<number>(0)

  createEffect(() => {
    if (transactions.length > 0) {
      const incomeAmount = transactions.filter((transaction) => transaction.amount > 0).reduce((acc, transaction) => acc + transaction.amount, 0)
      setIncome(incomeAmount)

      const expenseAmount = transactions.filter((transaction) => transaction.amount < 0).reduce((acc, transaction) => acc + transaction.amount, 0)
      setExpense(expenseAmount)
    }
  })

  return { income, expense }
}
