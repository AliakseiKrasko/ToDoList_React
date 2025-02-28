import { Dispatch } from "redux"
import { AppDispatch, RootState } from "../../../app/store"
import { todolistsApi } from "../api/todolistsApi"
import { RequestStatus, setAppError, setAppStatus } from "../../../app/appSlice"
import { ResultCode } from "../lib/enams"
import { addTaskAC, fetchTasksTC } from "./task-reducer"
import { HandleServerError } from "common/utils"
import { HandleAppError } from "common/utils/handleAppError"
import { Todolist, TodolistsResponseSchema } from "features/auth/lib/schemas/liginSchema"
import { createSlice } from "@reduxjs/toolkit"

export type FilterValuesType = "all" | "active" | "completed"

export type DomainTodolist = Todolist & {
  filter: FilterValuesType
  entityStatus: RequestStatus
}

const initialState: DomainTodolist[] = []

export const todolistsSlice = createSlice({
  name: "todolists",
  initialState: [] as DomainTodolist[],
  reducers: (create) => {
    return {
      removeTodolist: create.reducer<{ id: string }>((state, action) => {
        // return state.filter((tl) => tl.id !== action.payload.id)
        const index = state.findIndex((todo) => todo.id === action.payload.id)
        if (index !== -1) {
          state.splice(index, 1)
        }
      }),
      addTodolist: create.reducer<{ todolist: Todolist }>((state, action) => {
        const newTodolist: DomainTodolist = {
          ...action.payload.todolist,
          filter: "all",
          entityStatus: "idle",
        }
        state.unshift(newTodolist)
      }),
      changeTodolistTitle: create.reducer<{ id: string; title: string }>((state, action) => {
        // return state.map((tl) => (tl.id === action.payload.id ? { ...tl, title: action.payload.title } : tl))
        const index = state.findIndex((tl) => tl.id === action.payload.id)
        if (index !== -1) {
          state[index].title = action.payload.title
        }
      }),
      changeTodolistFilter: create.reducer<{ id: string; filter: FilterValuesType }>((state, action) => {
        // return state.map((tl) => (tl.id === action.payload.id ? { ...tl, filter: action.payload.filter } : tl))
        const todolist = state.find((tl) => tl.id === action.payload.id)
        if (todolist) {
          todolist.filter = action.payload.filter
        }
      }),
      changeTodolistEntityStatus: create.reducer<{ id: string; entityStatus: RequestStatus }>((state, action) => {
        const todolist = state.find((tl) => tl.id === action.payload.id)
        if (todolist) {
          todolist.entityStatus = action.payload.entityStatus
        }
      }),
    }
  },
})

export const todolistsReducer = (state: DomainTodolist[] = initialState, action: ActionsType): DomainTodolist[] => {
  switch (action.type) {
    case "SET-TODOLISTS": {
      return action.todolists.map((tl) => ({ ...tl, filter: "all", entityStatus: "idle" }))
    }
    case "CLEAR-DATA": {
      return []
    }

    default:
      return state
  }
}

// Action creators

export const setTodolistsAC = (todolists: Todolist[]) => {
  return { type: "SET-TODOLISTS", todolists } as const
}

export const clearTodolistsDataAC = () => ({ type: "CLEAR-DATA" }) as const

//Thunk

export const fetchTodolistsTC = () => (dispatch: AppDispatch) => {
  dispatch(setAppStatus({ status: "loading" }))
  todolistsApi
    .getTodolists()
    .then((res) => {
      const parsedData = TodolistsResponseSchema.safeParse(res.data)

      if (!parsedData.success) {
        dispatch(setAppError({ error: "Invalid server response" }))
        dispatch(setAppStatus({ status: "failed" }))
        return
      }

      dispatch(setAppStatus({ status: "succeeded" }))
      dispatch(setTodolistsAC(parsedData.data))

      parsedData.data.forEach((tl) => {
        dispatch(fetchTasksTC(tl.id))
      })
    })
    .catch((error) => {
      HandleServerError(dispatch, error)
    })
}

export const addTodolistTC = (title: string) => (dispatch: AppDispatch) => {
  dispatch(setAppStatus({ status: "loading" }))
  todolistsApi
    .createTodolist(title)
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(addTodolistAC(res.data.data.item))
        dispatch(setAppStatus({ status: "succeeded" }))
      } else {
        HandleAppError(dispatch, res.data)
      }
    })
    .catch((err) => {
      HandleServerError(dispatch, err)
    })
}

export const removeTodolistTC = (id: string) => (dispatch: AppDispatch) => {
  dispatch(setAppStatus({ status: "loading" }))
  dispatch(changeTodolistEntityStatusAC({ id, entityStatus: "loading" }))
  todolistsApi.deleteTodolist(id).then((res) => {
    if (res.data.resultCode === ResultCode.Success) {
      dispatch(setAppStatus({ status: "succeeded" }))
      dispatch(removeTodolistAC(id))
    } else {
      dispatch(setAppError({ error: res.data.messages.length ? res.data.messages[0] : "Some error occurred." }))
      dispatch(setAppStatus({ status: "failed" }))
      dispatch(changeTodolistEntityStatusAC({ id, entityStatus: "idle" }))
    }
  })
}

export const updateTodolistTitleTC = (arg: { id: string; title: string }) => (dispatch: AppDispatch) => {
  dispatch(setAppStatus({ status: "loading" }))
  todolistsApi.updateTodolist(arg.id, arg.title)
  dispatch(changeTodolistTitleAC({ id: arg.id, title: arg.title }))
  dispatch(setAppStatus({ status: "succeeded" }))
}

// Actions types

export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>

export type clearTodolistsDataActionType = ReturnType<typeof clearTodolistsDataAC>

type ActionsType = SetTodolistsActionType | clearTodolistsDataActionType
