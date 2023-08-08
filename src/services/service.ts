import PocketBase from 'pocketbase'
import { Project, Tags, Transaction } from './domain'

const pb = new PocketBase(import.meta.env.VITE_BACKEND_URL)

export async function getActiveProject(): Promise<Project> {
  let id = localStorage.getItem('projects')
  if (!id) {
    const project = await pb.collection('projects').create<Project>({ name: 'Project' })
    id = project.id
    localStorage.setItem('projects', id)
    return project
  }
  return await pb.collection('projects').getOne(id)
}

// create project
export async function createProject(name: string): Promise<Project> {
  const data = await pb.collection('projects').create<Project>({
    name,
  })
  return data
}

// fetch a paginated records list
export async function getProjectTransactions(id: string): Promise<Transaction[]> {
  const data = await pb.collection('transactions').getList<Transaction>(0, 20, {
    fields: id,
    filter: 'created >= "2022-01-01 00:00:00" && someField1 != someField2',
  })

  return data.items
}

// save transaction
export async function saveTransaction(project: Project, transaction: Transaction): Promise<Transaction> {
  const data = await pb.collection('transactions').create<Transaction>({
    project: project.id,
    item: transaction.item,
    amount: transaction.amount,
    remarks: transaction.remarks,
    fixed: transaction.fixed,
  })

  return data
}

// update transaction
export async function updateTransaction(transaction: Transaction): Promise<Transaction> {
  const data = await pb.collection('transactions').update<Transaction>(transaction.id, {
    item: transaction.item,
    amount: transaction.amount,
    remarks: transaction.remarks,
    fixed: transaction.fixed,
  })

  return data
}

// get tags
export async function getTags(): Promise<Tags[]> {
  const data = await pb.collection('tags').getList<Tags>(0, 20, {
    fields: 'id,tag',
  })
  return data.items
}

// create tag
export async function createTag(tag: string): Promise<Tags> {
  const data = await pb.collection('tags').create<Tags>({
    tag,
  })
  return data
}

// on transaction added event
export function onTransactionAdded(callback: (task: Transaction) => void) {
  pb.collection('transactions').subscribe<Transaction>('*', (ev) => {
    if (ev.action === 'create') callback(ev.record)
  })
}
