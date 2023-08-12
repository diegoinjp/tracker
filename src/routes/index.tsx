import { For, createSignal, onMount } from 'solid-js'
import { IncomeExpense } from '~/components/IncomeExpense'
import { Project, Transaction } from '~/services/domain'
import { getActiveProject, getProjectTransactions, onTransactionAdded } from '~/services/service'
import { formatCurrency } from '~/utils/functions'

export default function Tracker() {
  const [transactions, setTransactions] = createSignal([] as Transaction[])
  const [project, setProject] = createSignal({} as Project)

  onMount(async () => {
    const p = await getActiveProject()
    setProject(p)
    setTransactions(await getProjectTransactions(p.id))
    onTransactionAdded((transaction) => {
      if (!transactions().find((t) => t.id == transaction.id)) {
        setTransactions([...transactions(), transaction])
      }
    })
  })

  function saveTransaction(transaction: Transaction) {
    setTransactions([...transactions(), transaction])
  }

  console.log('transactions', transactions())

  const balance = () => {
    let balance = 0
    transactions().forEach((transaction) => {
      balance += transaction.amount
    })
    return formatCurrency(balance)
  }

  return (
    <main class="text-center mx-auto max-w-lg text-gray-700 p-4 bg-slate-200">
      <p>Balance: {balance()}</p>
      <IncomeExpense transactions={transactions()} />
      {transactions().length > 0 && (
        <For each={transactions()}>
          {(transaction) => (
            <div class="flex justify-between">
              <div class="flex flex-col">
                <div class="text-sm">{transaction.name}</div>
                <div class="text-sm">{transaction.remarks}</div>
              </div>
              <div class="text-sm">{formatCurrency(transaction.amount)}</div>
            </div>
          )}
        </For>
      )}
    </main>
  )
}
