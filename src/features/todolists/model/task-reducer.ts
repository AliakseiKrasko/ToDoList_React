import { AddTodolistActionType, clearTodolistsDataActionType, RemoveTodolistActionType } from "./todolistsSlice"
import { tasksApi } from "../api/tasksApi"
import { DomainTask, UpdateTaskDomainModel } from "../api/tasksApi.types"
import { AppDispatch, AppThunk } from "../../../app/store"
import { ResultCode } from "../lib/enams"
import { HandleServerError } from "common/utils"
import { HandleAppError } from "common/utils/handleAppError"
import { setAppStatus } from "../../../app/appSlice"

export type TasksStateType = {
  [key: string]: DomainTask[]
}

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
  switch (action.type) {
    case "SET-TASKS": {
      const stateCopy = { ...state }
      stateCopy[action.payload.todolistId] = action.payload.tasks
      return stateCopy
    }

    case "REMOVE-TASK": {
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].filter((t) => t.id !== action.payload.taskId),
      }
    }

    case "ADD-TASK": {
      const newTask = action.payload.task
      return { ...state, [newTask.todoListId]: [newTask, ...state[newTask.todoListId]] }
    }

    case "UPDATE_TASK": {
      const updatedTask = action.payload.task
      return {
        ...state,
        [updatedTask.todoListId]: state[updatedTask.todoListId].map((t) =>
          t.id === updatedTask.id
            ? {
                ...t,
                status: updatedTask.status ?? t.status, // ✅ Используем `??`, чтобы не потерять старые данные
                title: updatedTask.title ?? t.title,
              }
            : t,
        ),
      }
    }

    case "ADD-TODOLIST":
      return { ...state, [action.payload.todolist.id]: [] }

    case "REMOVE-TODOLIST": {
      let copyState = { ...state }
      delete copyState[action.payload.id]
      return copyState
    }
    case "CLEAR-DATA": {
      return {}
    }

    default:
      return state
  }
}

// Action creators
export const removeTaskAC = (payload: { taskId: string; todolistId: string }) => {
  return {
    type: "REMOVE-TASK",
    payload,
  } as const
}

export const addTaskAC = (payload: { task: DomainTask }) => {
  return {
    type: "ADD-TASK",
    payload,
  } as const
}

export const updateTaskAC = (payload: { task: DomainTask }) => {
  return {
    type: "UPDATE_TASK",
    payload,
  } as const
}

export const setTasksAC = (payload: { todolistId: string; tasks: DomainTask[] }) => {
  return {
    type: "SET-TASKS",
    payload,
  } as const
}

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

// Actions types
export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusActionType = ReturnType<typeof updateTaskAC>
export type ChangeTaskTitleActionType = ReturnType<typeof updateTaskAC>
export type SetTasksActionType = ReturnType<typeof setTasksAC>

type ActionsType =
  | RemoveTaskActionType
  | AddTaskActionType
  | ChangeTaskStatusActionType
  | ChangeTaskTitleActionType
  | AddTodolistActionType
  | RemoveTodolistActionType
  | SetTasksActionType
  | clearTodolistsDataActionType
