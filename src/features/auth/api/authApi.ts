import { LoginArgs, MeResponse } from "./authApi.types"
import { BaseResponse } from "common/types/types"
import { instance } from "common/instance/instance"
import { baseApi } from "../../../app/baseApi"
import { BaseQueryArg } from "@reduxjs/toolkit/query"

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => {
    return {
      login: build.mutation<BaseResponse<{ userId: number; token: string }>, LoginArgs>({
        query: (arg) => {
          return {
            method: "POST",
            url: "auth/login",
            body: arg,
          }
        },
      }),
      logout: build.mutation<BaseResponse, void>({
        query: () => {
          return {
            method: "DELETE",
            url: "auth/login",
          }
        },
      }),
      me: build.query<BaseResponse<MeResponse>, void>({
        query: () => {
          return {
            method: "GET",
            url: "auth/me",
          }
        },
      }),
    }
  },
})

export const { useLoginMutation, useLogoutMutation, useMeQuery } = authApi

export const _authApi = {
  login(payload: LoginArgs) {
    return instance.post<BaseResponse<{ userId: number; token: string }>>(`auth/login`, payload)
  },
  logout() {
    return instance.delete<BaseResponse>(`auth/login`)
  },
  me() {
    return instance.get<BaseResponse<MeResponse>>(`auth/me`)
  },
}
