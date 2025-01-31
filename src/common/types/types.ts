export type FieldError = {
  error: string
  field: string
}

export type BaseResponse<T = {}> = {
  resultCode: number
  messages: string[]
  fieldsErrors: FieldError[]
  data: T
}

export type CommonError = {
  error: string
  field: string
}
