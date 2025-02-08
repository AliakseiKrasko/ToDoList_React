import { v1 } from "uuid"
import { AddTodolistActionType, DomainTodolist, RemoveTodolistActionType } from "./todolists-reducer"
import { tasksApi } from "../api/tasksApi"
import { Dispatch } from "redux"
import { TaskStatus } from "../lib/enams"
import { DomainTask, UpdateTaskModel } from "../api/tasksApi.types"
import { AppDispatch, AppThunk, RootState } from "../../../app/store"

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

    case "CHANGE_TASK_STATUS": {
      const newTask = action.payload.task
      return {
        ...state,
        [newTask.todoListId]: state[newTask.todoListId].map((t) =>
          t.id === newTask.id ? { ...t, status: newTask.status } : t,
        ),
      }
    }

    case "CHANGE_TASK_TITLE": {
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].map((t) =>
          t.id === action.payload.taskId
            ? {
                ...t,
                title: action.payload.title,
              }
            : t,
        ),
      }
    }

    case "ADD-TODOLIST":
      return { ...state, [action.payload.todolistId]: [] }

    case "REMOVE-TODOLIST": {
      let copyState = { ...state }
      delete copyState[action.payload.id]
      return copyState
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

export const changeTaskStatusAC = (payload: { task: DomainTask }) => {
  return {
    type: "CHANGE_TASK_STATUS",
    payload,
  } as const
}

export const changeTaskTitleAC = (payload: { taskId: string; title: string; todolistId: string }) => {
  return {
    type: "CHANGE_TASK_TITLE",
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
  tasksApi.getTasks(todolistId).then((res) => {
    dispatch(setTasksAC({ tasks: res.data.items, todolistId }))
  })
}

export const removeTaskTC = (args: { taskId: string; todolistId: string }) => (dispatch: AppDispatch) => {
  tasksApi.deleteTask(args).then(() => {
    dispatch(removeTaskAC(args))
  })
}

export const addTaskTC = (args: { title: string; todolistId: string }) => (dispatch: AppDispatch) => {
  tasksApi.createTask(args).then((res) => {
    dispatch(addTaskAC({ task: res.data.data.item }))
  })
}

export const changeTaskStatusTC =
  (task: DomainTask): AppThunk =>
  (dispatch) => {
    tasksApi.updateTask({ taskId: task.id, todolistId: task.todoListId, model: task }).then(() => {
      dispatch(changeTaskStatusAC({ task }))
    })
  }

// Actions types
export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>
export type SetTasksActionType = ReturnType<typeof setTasksAC>

type ActionsType =
  | RemoveTaskActionType
  | AddTaskActionType
  | ChangeTaskStatusActionType
  | ChangeTaskTitleActionType
  | AddTodolistActionType
  | RemoveTodolistActionType
  | SetTasksActionType
