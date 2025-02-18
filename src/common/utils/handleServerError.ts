import { setAppErrorAC, setAppStatusAC } from "../../app/app-reducer"
import { AppDispatch } from "../../app/store"

export const HandleServerError = (dispatch: AppDispatch, err: { message: string }) => {
  dispatch(setAppErrorAC(err.message))
  dispatch(setAppStatusAC("failed"))
}
