import { Component } from 'solid-js'
import useCheckTransaction from '~/hooks/useCheckTransaction'
import { Transaction } from '~/services/domain'
import { formatCurrency } from '~/utils/functions'

export const IncomeExpense: Component<{
  transactions: Transaction[]
}> = (props) => {
  const { income, expense } = useCheckTransaction(props.transactions)

  const LABEL_STYLE = 'text-lg'
  const AMOUNT_STYLE = 'text-2xl'

  return (
    <div class="flex">
      <div class="flex-1">
        <div class={LABEL_STYLE}>Income</div>
        <div class={`${AMOUNT_STYLE} text-green-500`}>{formatCurrency(income())}</div>
      </div>
      <div class="flex-1">
        <div class={LABEL_STYLE}>Expense</div>
        <div class={`${AMOUNT_STYLE} text-red-500`}>{formatCurrency(Math.abs(expense()))}</div>
      </div>
    </div>
  )
}
