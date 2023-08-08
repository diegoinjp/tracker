import { createSignal, onMount } from 'solid-js'
import { Project, Transaction } from '~/services/domain'
import { getActiveProject, getProjectTransactions, onTransactionAdded } from '~/services/service'

export default function Tracker() {
  const [transactions, setTransactions] = createSignal([] as Transaction[])
  const [project, setProject] = createSignal({} as Project)

  onMount(async () => {
    const project = await getActiveProject()
    setProject(project)
    setTransactions(await getProjectTransactions(project.id))
    onTransactionAdded((transaction) => {
      if (!transactions().find((t) => t.id == transaction.id)) {
        setTransactions([...transactions(), transaction])
      }
    })
  })

  // debug transactions
  console.log('@@@@@@@@', transactions(), project())

  function saveTransaction(transaction: Transaction) {
    setTransactions([...transactions(), transaction])
  }

  return (
    <main class="text-center mx-auto text-gray-700 p-4">
      <div>hola OOTTI</div>
    </main>
  )
}
