import { v1 } from "uuid"
import { AddTodolistActionType, DomainTodolist, RemoveTodolistActionType } from "./todolists-reducer"
import { tasksApi } from "../api/tasksApi"
import { Dispatch } from "redux"
import { TaskStatus } from "../lib/enams"
import { DomianTask } from "../api/tasksApi.types"
import { AppDispatch } from "../../../app/store"

export type TasksStateType = {
  [key: string]: Array<DomianTask>
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
      const newTask: DomianTask = {
        title: action.payload.title,
        status: TaskStatus.New,
        id: v1(),
        todoListId: action.payload.todolistId,
        order: 0,
        priority: 0,
        addedDate: "",
        deadline: "",
        startDate: "",
        description: "",
      }
      return { ...state, [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]] }
    }

    case "CHANGE_TASK_STATUS": {
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].map((t) =>
          t.id === action.payload.taskId
            ? {
                ...t,
                isDone: action.payload.isDone,
              }
            : t,
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

//Thunk

export const fetchTasksTC = (id: string) => {
  return (dispatch: AppDispatch) => {
    tasksApi.getTasks(id).then((res) => {
      dispatch(setTasksAC({ todolistId: id, tasks: res.data.items }))
    })
  }
}

// Action creators

export const setTasksAC = (payload: { todolistId: string; tasks: DomianTask[] }) => {
  return {
    type: "SET-TASKS",
    payload,
  } as const
}

export const removeTaskAC = (payload: { taskId: string; todolistId: string }) => {
  return {
    type: "REMOVE-TASK",
    payload,
  } as const
}

export const addTaskAC = (payload: { title: string; todolistId: string }) => {
  return {
    type: "ADD-TASK",
    payload,
  } as const
}

export const changeTaskStatusAC = (payload: { taskId: string; isDone: boolean; todolistId: string }) => {
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
