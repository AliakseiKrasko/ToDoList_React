import { LoginArgs } from "../api/authApi.types"
import { setAppStatusAC } from "../../../app/app-reducer"
import { Dispatch } from "redux"
import { tasksApi } from "../../todolists/api/tasksApi"
import { ResultCode } from "../../todolists/lib/enams"
import { HandleAppError } from "common/utils/handleAppError"
import { HandleServerError } from "common/utils"
import { removeTaskAC } from "../../todolists/model/task-reducer"
import { authApi } from "../api/authApi"
import { AppDispatch } from "../../../app/store"

type InitialStateType = typeof initialState

const initialState = {
  isLoggedIn: false,
  isInitialized: false,
}

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case "SET_IS_LOGGED_IN":
      return { ...state, isLoggedIn: action.payload.isLoggedIn }
    case "SET_IS_INITIALIZED":
      return { ...state, isInitialized: action.payload.isInitialized }
    default:
      return state
  }
}
// Action creators
const setIsLoggedInAC = (isLoggedIn: boolean) => {
  return { type: "SET_IS_LOGGED_IN", payload: { isLoggedIn } } as const
}
const setIsInitializedAC = (isInitialized: boolean) => {
  return { type: "SET_IS_INITIALIZED", payload: { isInitialized } } as const
}

// Actions types
type ActionsType = ReturnType<typeof setIsLoggedInAC> | ReturnType<typeof setIsInitializedAC>

// thunks
export const loginTC = (data: LoginArgs) => (dispatch: AppDispatch) => {
  dispatch(setAppStatusAC("loading"))
  authApi
    .login(data)
    .then((res) => {
      debugger
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setAppStatusAC("succeeded"))
        dispatch(setIsLoggedInAC(true))
        localStorage.setItem("sn-token", res.data.data.token)
      } else {
        HandleAppError(dispatch, res.data)
      }
    })
    .catch((err) => {
      HandleServerError(dispatch, err)
    })
}

export const logoutTC = () => (dispatch: AppDispatch) => {
  dispatch(setAppStatusAC("loading"))
  authApi
    .logout()
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setAppStatusAC("succeeded"))
        dispatch(setIsLoggedInAC(false))
        localStorage.removeItem("sn-token")
      } else {
        HandleAppError(dispatch, res.data)
      }
    })
    .catch((error) => {
      HandleServerError(dispatch, error)
    })
}

export const initializeTC = () => (dispatch: AppDispatch) => {
  dispatch(setAppStatusAC("loading"))
  authApi
    .me()
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setAppStatusAC("succeeded"))
        dispatch(setIsLoggedInAC(true))
      } else {
        debugger
        HandleAppError(dispatch, res.data)
      }
    })
    .catch((error) => {
      HandleServerError(dispatch, error)
    })
    .finally(() => {
      dispatch(setIsInitializedAC(true))
    })
}
