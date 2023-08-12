import { For, Show, createSignal, onMount } from 'solid-js'
import { IncomeExpense } from '~/components/IncomeExpense'
import { List } from '~/components/List'
import useCheckTransaction from '~/hooks/useCheckTransaction'
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
    <main class="text-center mx-auto max-w-sm text-gray-700 p-4 flex flex-col gap-8">
      <Show when={project().name && transactions().length > 0} fallback={<p>Loading</p>}>
        {/* Big balance with label */}
        <div>
          <h3 class="text-2xl text-gray-500">Balance</h3>
          <h1 class="text-4xl text-gray-700">{balance()}</h1>
        </div>
        <IncomeExpense transactions={transactions()} />
        <List transactions={transactions()} />
      </Show>
    </main>
  )
}
