import { AppDispatch } from "../../../app/store"
import { todolistsApi } from "../api/todolistsApi"
import { RequestStatus, setAppError, setAppStatus } from "../../../app/appSlice"
import { ResultCode } from "../lib/enams"
import { fetchTasksTC } from "./taskSlice"
import { HandleServerError } from "common/utils"
import { HandleAppError } from "common/utils/handleAppError"
import { Todolist, TodolistsResponseSchema } from "features/auth/lib/schemas/liginSchema"
import { createSlice } from "@reduxjs/toolkit"

export type FilterValuesType = "all" | "active" | "completed"

export type DomainTodolist = Todolist & {
  filter: FilterValuesType
  entityStatus: RequestStatus
}

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
      setTodolists: create.reducer<{ todolists: Todolist[] }>((state, action) => {
        // return action.todolists.map((tl) => ({ ...tl, filter: "all", entityStatus: "idle" }))
        action.payload.todolists.forEach((tl) => {
          state.push({ ...tl, filter: "all", entityStatus: "idle" })
        })
      }),
      clearTodolists: create.reducer((state, action) => {
        // state = []
        return []
      }),
    }
  },
})

export const todolistsReducer = todolistsSlice.reducer
export const {
  removeTodolist,
  addTodolist,
  changeTodolistEntityStatus,
  changeTodolistFilter,
  changeTodolistTitle,
  clearTodolists,
  setTodolists,
} = todolistsSlice.actions

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
      dispatch(setTodolists({ todolists: parsedData.data }))

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
        dispatch(addTodolist({ todolist: res.data.data.item }))
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
  dispatch(changeTodolistEntityStatus({ id, entityStatus: "loading" }))
  todolistsApi.deleteTodolist(id).then((res) => {
    if (res.data.resultCode === ResultCode.Success) {
      dispatch(setAppStatus({ status: "succeeded" }))
      dispatch(removeTodolist({ id }))
    } else {
      dispatch(setAppError({ error: res.data.messages.length ? res.data.messages[0] : "Some error occurred." }))
      dispatch(setAppStatus({ status: "failed" }))
      dispatch(changeTodolistEntityStatus({ id, entityStatus: "idle" }))
    }
  })
}

export const updateTodolistTitleTC = (arg: { id: string; title: string }) => (dispatch: AppDispatch) => {
  dispatch(setAppStatus({ status: "loading" }))
  todolistsApi.updateTodolist(arg.id, arg.title)
  dispatch(changeTodolistTitle({ id: arg.id, title: arg.title }))
  dispatch(setAppStatus({ status: "succeeded" }))
}
