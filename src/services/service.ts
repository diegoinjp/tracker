import PocketBase from 'pocketbase'
import { Project, Tags, Transaction } from './domain'

const pb = new PocketBase(import.meta.env.VITE_BACKEND_URL)
const authData = await pb.admins.authWithPassword(import.meta.env.VITE_ADMIN, import.meta.env.VITE_PASSWORD)

export async function getActiveProject(): Promise<Project> {
  let id = localStorage.getItem('projects')
  if (id) return await pb.collection('projects').getOne(id)
  const project = await pb.collection('projects').create<Project>({ id: 1, name: 'project1' })
  id = project.id
  localStorage.setItem('projects', id)
  return project
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
  const resultList = await pb.collection('transactions').getList<Transaction>(1, 50, {
    field: id,
    filter: 'created >= "2023-01-01 00:00:00"',
    sort: '-created',
  })
  console.log('💦', resultList)
  return resultList.items
}

// save transaction
export async function saveTransaction(project: Project, transaction: Transaction): Promise<Transaction> {
  const data = await pb.collection('transactions').create<Transaction>({
    project: project.id,
    name: transaction.name,
    amount: transaction.amount,
    tag: transaction.tag,
    remarks: transaction.remarks,
    fixed: transaction.fixed,
  })

  return data
}

// update transaction
export async function updateTransaction(transaction: Transaction): Promise<Transaction> {
  const data = await pb.collection('transactions').update<Transaction>(transaction.id, {
    name: transaction.name,
    amount: transaction.amount,
    remarks: transaction.remarks,
    tag: transaction.tag,
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
