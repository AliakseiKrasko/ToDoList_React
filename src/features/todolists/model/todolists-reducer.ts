import { Todolist } from "../api/todolistsApi.types"
import { Dispatch } from "redux"
import { AppDispatch, RootState } from "../../../app/store"
import { todolistsApi } from "../api/todolistsApi"
import { RequestStatus, setAppErrorAC, setAppStatusAC } from "../../../app/app-reducer"
import { ResultCode } from "../lib/enams"
import { addTaskAC, fetchTasksTC } from "./task-reducer"
import { HandleServerError } from "common/utils"
import { HandleAppError } from "common/utils/handleAppError"

export type FilterValuesType = "all" | "active" | "completed"

export type DomainTodolist = Todolist & {
  filter: FilterValuesType
  entityStatus: RequestStatus
}

const initialState: DomainTodolist[] = []

export const todolistsReducer = (state: DomainTodolist[] = initialState, action: ActionsType): DomainTodolist[] => {
  switch (action.type) {
    case "SET-TODOLISTS": {
      return action.todolists.map((tl) => ({ ...tl, filter: "all", entityStatus: "idle" }))
    }
    case "REMOVE-TODOLIST": {
      return state.filter((tl) => tl.id !== action.payload.id)
    }

    case "ADD-TODOLIST": {
      const newTodolist: DomainTodolist = {
        id: action.payload.todolist.id,
        title: action.payload.todolist.title,
        filter: "all",
        addedDate: "",
        order: 0,
        entityStatus: "idle",
      }
      return [...state, newTodolist]
    }

    case "CHANGE-TODOLIST-TITLE": {
      return state.map((tl) => (tl.id === action.payload.id ? { ...tl, title: action.payload.title } : tl))
    }

    case "CHANGE-TODOLIST-FILTER": {
      return state.map((tl) => (tl.id === action.payload.id ? { ...tl, filter: action.payload.filter } : tl))
    }
    case "CHANGE-TODOLIST-ENTITY-STATUS": {
      return state.map((tl) =>
        tl.id === action.payload.id ? { ...tl, entityStatus: action.payload.entityStatus } : tl,
      )
    }
    case "CLEAR-DATA": {
      return []
    }

    default:
      return state
  }
}

// Action creators
export const removeTodolistAC = (id: string) => {
  return { type: "REMOVE-TODOLIST", payload: { id } } as const
}

export const addTodolistAC = (todolist: Todolist) => {
  return { type: "ADD-TODOLIST", payload: { todolist } } as const
}

export const changeTodolistTitleAC = (payload: { id: string; title: string }) => {
  return { type: "CHANGE-TODOLIST-TITLE", payload } as const
}

export const changeTodolistFilterAC = (payload: { id: string; filter: FilterValuesType }) => {
  return { type: "CHANGE-TODOLIST-FILTER", payload } as const
}
export const setTodolistsAC = (todolists: Todolist[]) => {
  return { type: "SET-TODOLISTS", todolists } as const
}
export const changeTodolistEntityStatusAC = (payload: { id: string; entityStatus: RequestStatus }) => {
  return { type: "CHANGE-TODOLIST-ENTITY-STATUS", payload } as const
}
export const clearTodolistsDataAC = () => ({ type: "CLEAR-DATA" }) as const

//Thunk

export const fetchTodolistsTC = () => (dispatch: AppDispatch) => {
  dispatch(setAppStatusAC("loading"))
  todolistsApi
    .getTodolists()
    .then((res) => {
      dispatch(setAppStatusAC("succeeded"))
      dispatch(setTodolistsAC(res.data))
      return res.data
    })
    .then((todos) => {
      todos.forEach((tl) => {
        dispatch(fetchTasksTC(tl.id))
      })
    })
    .catch((error) => {
      HandleServerError(dispatch, error)
    })
}

export const addTodolistTC = (title: string) => (dispatch: AppDispatch) => {
  dispatch(setAppStatusAC("loading"))
  todolistsApi
    .createTodolist(title)
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(addTodolistAC(res.data.data.item))
        dispatch(setAppStatusAC("succeeded"))
      } else {
        HandleAppError(dispatch, res.data)
      }
    })
    .catch((err) => {
      HandleServerError(dispatch, err)
    })
}

export const removeTodolistTC = (id: string) => (dispatch: AppDispatch) => {
  dispatch(setAppStatusAC("loading"))
  dispatch(changeTodolistEntityStatusAC({ id, entityStatus: "loading" }))
  todolistsApi.deleteTodolist(id).then((res) => {
    if (res.data.resultCode === ResultCode.Success) {
      dispatch(setAppStatusAC("succeeded"))
      dispatch(removeTodolistAC(id))
    } else {
      dispatch(setAppErrorAC(res.data.messages.length ? res.data.messages[0] : "Some error occurred."))
      dispatch(setAppStatusAC("failed"))
      dispatch(changeTodolistEntityStatusAC({ id, entityStatus: "idle" }))
    }
  })
}

export const updateTodolistTitleTC = (arg: { id: string; title: string }) => (dispatch: AppDispatch) => {
  dispatch(setAppStatusAC("loading"))
  todolistsApi.updateTodolist(arg.id, arg.title)
  dispatch(changeTodolistTitleAC({ id: arg.id, title: arg.title }))
  dispatch(setAppStatusAC("succeeded"))
}

// Actions types
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>
export type ChangeTodolistEntityStatusActionType = ReturnType<typeof changeTodolistEntityStatusAC>
export type clearTodolistsDataActionType = ReturnType<typeof clearTodolistsDataAC>

type ActionsType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType
  | SetTodolistsActionType
  | ChangeTodolistEntityStatusActionType
  | clearTodolistsDataActionType
