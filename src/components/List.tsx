import { Component, For } from 'solid-js'
import { Transaction } from '~/services/domain'
import { capitalize, formatCurrency } from '~/utils/functions'

export const List: Component<{ transactions: Transaction[] }> = (props) => {
  const { transactions } = props

  return (
    <div class="flex flex-col gap-3">
      <div class="text-xl text-gray-500">History</div>
      <div class="border-b-2 border-gray-300 my-2"></div>
      {transactions.length > 0 && (
        <For each={transactions}>
          {(transaction) => (
            <div class="flex group">
              <div class={`transition-all w-full group-hover:w-11/12 border border-y-gray-300 border-l-gray-300 border-r-4 ${transaction.amount > 0 ? 'border-r-green-400' : 'border-r-red-400'} shadow flex justify-between p-2 bg-white hover:bg-slate-100 transition group`}>
                <div class="flex-1 text-start">{capitalize(transaction.name)}</div>
                <div class="flex-1 text-end">{formatCurrency(transaction.amount)}</div>
              </div>
              <div class="w-0 hidden group-hover:w-1/12 group-hover:flex justify-center items-center bg-red-400 text-white text-lg cursor-pointer transition-all transform">
                <button class="w-full h-full" onClick={() => console.log('delete', transaction.name, new Date(transaction.created).toLocaleDateString('ja-JP', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }))}>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </For>
      )}
    </div>
  )
}
