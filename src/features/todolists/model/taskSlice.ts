import { tasksApi } from "../api/tasksApi"
import { DomainTask, UpdateTaskDomainModel } from "../api/tasksApi.types"
import { AppDispatch, AppThunk } from "../../../app/store"
import { ResultCode } from "../lib/enams"
import { HandleServerError } from "common/utils"
import { HandleAppError } from "common/utils/handleAppError"
import { setAppStatus } from "../../../app/appSlice"
import { createSlice } from "@reduxjs/toolkit"
import { addTodolist, removeTodolist } from "./todolistsSlice"

export type TasksStateType = {
  [key: string]: DomainTask[]
}

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: {} as TasksStateType,
  reducers: (create) => ({
    setTasks: create.reducer<{ todolistId: string; tasks: DomainTask[] }>((state, action) => {
      state[action.payload.todolistId] = action.payload.tasks
    }),
    removeTask: create.reducer<{ taskId: string; todolistId: string }>((state, action) => {
      const tasks = state[action.payload.todolistId]
      const index = tasks.findIndex((task) => task.id === action.payload.taskId)
      if (index !== -1) {
        tasks.splice(index, 1)
      }
    }),
    addTask: create.reducer<{ task: DomainTask }>((state, action) => {
      const tasks = state[action.payload.task.todoListId]
      tasks.unshift(action.payload.task)
    }),
    updateTask: create.reducer<{ taskId: string; todolistId: string; domainModel: UpdateTaskDomainModel }>(
      (state, action) => {
        const tasks = state[action.payload.todolistId]
        const index = tasks.findIndex((t) => t.id === action.payload.taskId)
        if (index !== -1) {
          tasks[index] = { ...tasks[index], ...action.payload.domainModel }
        }
      },
    ),
    clearTasks: create.reducer(() => {
      return {}
    }),
  }),
  extraReducers: (builder) => {
    builder
      .addCase(addTodolist, (state, action) => {
        state[action.payload.todolist.id] = []
      })
      .addCase(removeTodolist, (state, action) => {
        delete state[action.payload.id]
      })
  },
})

export const {} = tasksSlice.actions
export const tasksReducer = tasksSlice.reducer

// Thunks
export const fetchTasksTC = (todolistId: string) => (dispatch: AppDispatch) => {
  dispatch(setAppStatus({ status: "loading" }))
  tasksApi.getTasks(todolistId).then((res) => {
    dispatch(setTasksAC({ tasks: res.data.items, todolistId }))
    dispatch(setAppStatus({ status: "succeeded" }))
  })
}

export const removeTaskTC = (args: { taskId: string; todolistId: string }) => (dispatch: AppDispatch) => {
  dispatch(setAppStatus({ status: "loading" }))
  tasksApi
    .deleteTask(args)
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(removeTaskAC(args))
        dispatch(setAppStatus({ status: "succeeded" }))
      } else {
        HandleAppError(dispatch, res.data)
      }
    })
    .catch((err) => {
      HandleServerError(dispatch, err)
    })
}

export const addTaskTC = (arg: { title: string; todolistId: string }) => (dispatch: AppDispatch) => {
  dispatch(setAppStatus({ status: "loading" }))
  tasksApi
    .createTask(arg)
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(addTaskAC({ task: res.data.data.item }))
        dispatch(setAppStatus({ status: "succeeded" }))
      } else {
        HandleAppError(dispatch, res.data)
      }
    })
    .catch((err) => {
      HandleServerError(dispatch, err)
    })
}
export const updateTaskTC =
  (arg: { taskId: string; todolistId: string; domainModel: UpdateTaskDomainModel }): AppThunk =>
  (dispatch, getState) => {
    const state = getState()
    const task = state.tasks[arg.todolistId]?.find((t) => t.id === arg.taskId)

    if (!task) {
      console.error(`Task with id ${arg.taskId} not found in todolist ${arg.todolistId}`)
      return
    }

    const updatedTask = { ...task, ...arg.domainModel }
    dispatch(setAppStatus({ status: "loading" }))
    tasksApi
      .updateTask({ taskId: arg.taskId, todolistId: arg.todolistId, model: updatedTask })
      .then((res) => {
        if (res.data.resultCode === 0) {
          dispatch(updateTaskAC({ task: updatedTask }))
          dispatch(setAppStatus({ status: "succeeded" }))
        } else {
          console.error(`Failed to update task: ${res.data.messages.join(", ")}`)
        }
      })
      .catch((error) => {
        console.error(`API error: ${error.message}`)
      })
  }
