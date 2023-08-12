import { Component } from 'solid-js'
import useCheckTransaction from '~/hooks/useCheckTransaction'
import { Transaction } from '~/services/domain'

export const IncomeExpense: Component<{
  transactions: Transaction[]
}> = (props) => {
  const { income, expense } = useCheckTransaction(props.transactions)

  return (
    <div class="flex">
      <div class="flex-1">
        <div class="text-sm">Income</div>
        <div class="text-sm">Expense</div>
      </div>
      <div class="flex-1">
        <div class="text-sm">{income()}</div>
        <div class="text-sm">{expense()}</div>
      </div>
    </div>
  )
}
