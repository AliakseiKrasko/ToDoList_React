import { instance } from "../../../common/instance/instance"
import { BaseResponse } from "common/types/types"
import { Todolist } from "./todolistsApi.types"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const _todolistsApi = {
  getTodolists() {
    return instance.get<Todolist[]>("todo-lists")
  },

  createTodolist(title: string) {
    return instance.post<BaseResponse<{ item: Todolist }>>("todo-lists", { title })
  },

  deleteTodolist(id: string) {
    return instance.delete<BaseResponse>(`todo-lists/${id}`)
  },

  updateTodolist(id: string, title: string) {
    return instance.put<BaseResponse>(`todo-lists/${id}`, { title })
  },
}
export const todolistsApi = createApi({
  // 3
  reducerPath: "todolistsApi",
  // 4
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("API-KEY", `${process.env.REACT_APP_API_KEY}`)
      headers.set("Authorization", `Bearer ${localStorage.getItem("sn-token")}`)
    },
  }),
  // 5
  endpoints: (build) => {
    return {
      // 6
      getTodolists: build.query<any[], void>({
        query: () => {
          return {
            url: "todo-lists",
            method: "GET",
          }
        },
      }),
    }
  },
})

// 7
export const { useGetTodolistsQuery } = todolistsApi
