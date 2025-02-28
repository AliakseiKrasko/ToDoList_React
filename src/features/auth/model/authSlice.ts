import { LoginArgs } from "../api/authApi.types"
import { setAppStatus } from "../../../app/appSlice"
import { ResultCode } from "../../todolists/lib/enams"
import { HandleAppError } from "common/utils/handleAppError"
import { HandleServerError } from "common/utils"
import { authApi } from "../api/authApi"
import { AppDispatch } from "../../../app/store"
import { clearTodolistsDataAC } from "../../todolists/model/todolists-reducer"
import { createSlice } from "@reduxjs/toolkit"

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    isInitialized: false,
  },
  reducers: (create) => ({
    setIsLoggedIn: create.reducer<{ isLoggedIn: boolean }>((state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn
    }),
    setIsInitialized: create.reducer<{ isInitialized: boolean }>((state, action) => {
      state.isInitialized = action.payload.isInitialized
    }),
  }),
})

export const authReducer = authSlice.reducer
export const { setIsLoggedIn, setIsInitialized } = authSlice.actions

// thunks
export const loginTC = (data: LoginArgs) => (dispatch: AppDispatch) => {
  dispatch(setAppStatus({ status: "loading" }))
  authApi
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
  authApi
    .logout()
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setAppStatus({ status: "succeeded" }))
        dispatch(setIsLoggedIn({ isLoggedIn: false }))
        dispatch(clearTodolistsDataAC())
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
  authApi
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
      dispatch(setIsInitialized({ isInitialized: true }))
    })
}
