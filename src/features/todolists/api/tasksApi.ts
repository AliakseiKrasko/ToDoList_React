import axios from "axios"
import { GetTasksResponse, Task, UpdateTaskModel } from "./tasksApi.types"
import { stat } from "node:fs"
import { BaseResponse } from "./todolistsApi.types"
import { TaskStatus } from "../../../app/AppHttpRequests"

const token = "06921f9d-5d6a-4cde-b24a-02816749f900"
const apiKey = "519e09f9-9dad-4c6c-8d50-5948d8b0629c"

const configs = {
  headers: {
    Authorization: `Bearer ${token}`,
    "API-KEY": apiKey,
  },
}

export const tasksApi = {
  getTAsks(todolistId: string) {
    const promise = axios.get<GetTasksResponse>(
      `https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks`,
      configs,
    )
    return promise
  },

  createTask(title: string, todolistId: string) {
    const promise = axios.post<BaseResponse<{ item: Task }>>(
      `https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks`,
      { title },
      configs,
    )
    return promise
  },

  removeTasks(taskId: string, todolistId: string) {
    const promise = axios.delete(
      `https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks/${taskId}`,
      configs,
    )
    return promise
  },

  changeTaskStatus(task: Task, newStatus: TaskStatus) {
    const model: UpdateTaskModel = {
      description: task.description,
      title: task.title,
      deadline: task.deadline,
      priority: task.priority,
      startDate: task.startDate,
      status: newStatus,
    }
    const promise = axios.put<BaseResponse>(
      `https://social-network.samuraijs.com/api/1.1/todo-lists/${task.todoListId}/tasks/${task.id}`,
      model,
      configs,
    )
    return promise
  },

  changeTaskTitle(taskId: string, todolistId: string, newTitle: string) {
    /*return axios.put<BaseResponse>(
        `https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks/${taskId}`,
        updatedTask, configs
    );
});*/
  },
}
