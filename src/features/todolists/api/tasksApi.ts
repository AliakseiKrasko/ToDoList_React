import axios from "axios"
import { GetTasksResponse, DomianTask, UpdateTaskModel } from "./tasksApi.types"
import { stat } from "node:fs"
import { BaseResponse } from "common/types/types"
import { TaskStatus } from "../lib/enams"
import { instance } from "common/instance/instance"

export const tasksApi = {
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks`)
  },

  createTask(title: string, todolistId: string) {
    return instance.post<BaseResponse<{ item: DomianTask }>>(
      `https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks`,
      { title },
    )
  },

  removeTasks(taskId: string, todolistId: string) {
    return instance.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks/${taskId}`)
  },

  changeTaskStatus(task: DomianTask, newStatus: TaskStatus) {
    const model: UpdateTaskModel = {
      description: task.description,
      title: task.title,
      deadline: task.deadline,
      priority: task.priority,
      startDate: task.startDate,
      status: newStatus,
    }
    return instance.put<BaseResponse>(
      `https://social-network.samuraijs.com/api/1.1/todo-lists/${task.todoListId}/tasks/${task.id}`,
      model,
    )
  },

  changeTaskTitle(todolistId: string, taskId: string, newTitle: string) {
    return instance.put<BaseResponse>(
      `https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks/${taskId}`,
      { title: newTitle }, // Теперь title передается правильно
    )
  },
}
