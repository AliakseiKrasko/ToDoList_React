import { LoginArgs } from "../api/authApi.types"
import { setAppStatusAC } from "../../../app/app-reducer"
import { Dispatch } from "redux"
import { tasksApi } from "../../todolists/api/tasksApi"
import { ResultCode } from "../../todolists/lib/enams"
import { HandleAppError } from "common/utils/handleAppError"
import { HandleServerError } from "common/utils"
import { removeTaskAC } from "../../todolists/model/task-reducer"
import { authApi } from "../api/authApi"

type InitialStateType = typeof initialState

const initialState = {
  isLoggedIn: false,
}

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case "SET_IS_LOGGED_IN":
      return { ...state, isLoggedIn: action.payload.isLoggedIn }
    default:
      return state
  }
}
// Action creators
const setIsLoggedInAC = (isLoggedIn: boolean) => {
  return { type: "SET_IS_LOGGED_IN", payload: { isLoggedIn } } as const
}

// Actions types
type ActionsType = ReturnType<typeof setIsLoggedInAC>

// thunks
export const loginTC = (data: LoginArgs) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC("loading"))
  authApi
    .login(data)
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setAppStatusAC("succeeded"))
        dispatch(setIsLoggedInAC(true))
      } else {
        HandleAppError(dispatch, res.data)
      }
    })
    .catch((err) => {
      HandleServerError(dispatch, err)
    })
}
