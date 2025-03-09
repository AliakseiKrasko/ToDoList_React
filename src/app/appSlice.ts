import { createSlice } from "@reduxjs/toolkit"
import { LoginArgs } from "../features/auth/api/authApi.types"
import { AppDispatch } from "./store"
import { _authApi } from "../features/auth/api/authApi"
import { ResultCode } from "../features/todolists/lib/enams"
import { HandleAppError } from "common/utils/handleAppError"
import { HandleServerError } from "common/utils"
import { clearTasks } from "../features/todolists/model/taskSlice"
import { clearTodolists } from "../features/todolists/model/todolistsSlice"

export type ThemeMode = "dark" | "light"
export type RequestStatus = "idle" | "loading" | "succeeded" | "failed"

export const appSlice = createSlice({
  name: "app",
  initialState: {
    themeMode: "dark" as ThemeMode,
    status: "idle" as RequestStatus,
    error: null as string | null,
    isLoggedIn: false,
  },
  reducers: (create) => ({
    changeTheme: create.reducer<{ themeMode: ThemeMode }>((state, action) => {
      state.themeMode = action.payload.themeMode
    }),
    setAppStatus: create.reducer<{ status: RequestStatus }>((state, action) => {
      state.status = action.payload.status
    }),
    setAppError: create.reducer<{ error: string | null }>((state, action) => {
      state.error = action.payload.error
    }),
    setIsLoggedIn: create.reducer<{ isLoggedIn: boolean }>((state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn
    }),
  }),
  selectors: {
    selectThemeMode: (state) => state.themeMode,
    selectAppStatus: (state) => state.status,
    selectAppError: (state) => state.error,
    selectIsLoggedIn: (state) => state.isLoggedIn,
  },
})

export const { changeTheme, setAppError, setAppStatus } = appSlice.actions
export const { selectAppStatus, selectAppError, selectThemeMode } = appSlice.selectors
export const appReducer = appSlice.reducer

// thunks
export const loginTC = (data: LoginArgs) => (dispatch: AppDispatch) => {
  dispatch(setAppStatus({ status: "loading" }))
  _authApi
    .login(data)
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setAppStatus({ status: "succeeded" }))
        dispatch(setIsLoggedIn({ isLoggedIn: true }))
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
  dispatch(setAppStatus({ status: "loading" }))
  _authApi
    .logout()
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setAppStatus({ status: "succeeded" }))
        dispatch(setIsLoggedIn({ isLoggedIn: false }))
        dispatch(clearTasks())
        dispatch(clearTodolists())
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
  dispatch(setAppStatus({ status: "loading" }))
  _authApi
    .me()
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setAppStatus({ status: "succeeded" }))
        dispatch(setIsLoggedIn({ isLoggedIn: true }))
      } else {
        HandleAppError(dispatch, res.data)
      }
    })
    .catch((error) => {
      HandleServerError(dispatch, error)
    })
    .finally(() => {
      // dispatch(setIsInitialized({ isInitialized: true }))
    })
}

export const { setIsLoggedIn } = appSlice.actions
export const { selectIsLoggedIn } = appSlice.selectors
