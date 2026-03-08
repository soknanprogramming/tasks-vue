export interface Task {
  name: string
  description: string
  completed?: boolean
}
export interface EditTask {
  isOpen: boolean
  index: number | null
  task?: Task
}
