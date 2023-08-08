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
  item: string
  amount: number
  tags?: string[]
  remarks?: string
  fixed: boolean
}
