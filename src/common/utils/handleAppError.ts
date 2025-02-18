import { setAppErrorAC, setAppStatusAC } from "../../app/app-reducer"
import { AppDispatch } from "../../app/store"
import { BaseResponse } from "common/types/types"

// BaseResponse<{ item: DomainTask }>
//BaseResponse<{ item: Todolist }>

export const HandleAppError = <T>(dispatch: AppDispatch, data: BaseResponse<T>) => {
  dispatch(setAppErrorAC(data.messages.length ? data.messages[0] : "Some error occurred."))
  dispatch(setAppStatusAC("failed"))
}
