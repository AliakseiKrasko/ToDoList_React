// Типы

import { TaskPriority, TaskStatus } from "../lib/enams"

export type GetTasksResponse = {
  error: string | null
  totalCount: number
  items: DomianTask[]
}

export type DomianTask = {
  description: string | null
  title: string
  status: TaskStatus
  priority: TaskPriority
  startDate: string | null
  deadline: string | null
  id: string
  todoListId: string
  order: number
  addedDate: string
}

export type UpdateTaskModel = {
  description: string | null
  title: string
  status: TaskStatus
  priority: TaskPriority
  startDate: string | null
  deadline: string | null
}
