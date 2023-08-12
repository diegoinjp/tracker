export interface Base {
  created: string
  updated: string
}

export interface Project extends Base {
  id: string
  name: string
}

export interface Tags extends Base {
  id: string
  tag: string
}

export interface Transaction extends Base {
  id: string
  project_id: string
  name: string
  amount: number
  tag?: string[]
  remarks?: string
  fixed: boolean
}
