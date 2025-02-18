import { setAppErrorAC, setAppStatusAC } from "../../app/app-reducer"
import { AppDispatch } from "../../app/store"

export const HandleAppError = (dispatch: AppDispatch, data: any) => {
  dispatch(setAppErrorAC(data.messages.length ? data.messages[0] : "Some error occurred."))
  dispatch(setAppStatusAC("failed"))
}
