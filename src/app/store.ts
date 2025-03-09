import { applyMiddleware, combineReducers, legacy_createStore, UnknownAction } from "redux"

import { todolistsReducer, todolistsSlice } from "../features/todolists/model/todolistsSlice"
import { thunk, ThunkAction, ThunkDispatch } from "redux-thunk"
import { appReducer, appSlice } from "./appSlice"
import { tasksReducer, tasksSlice } from "../features/todolists/model/taskSlice"
import { configureStore } from "@reduxjs/toolkit"
import { _todolistsApi, todolistsApi } from "../features/todolists/api/todolistsApi"
import { setupListeners } from "@reduxjs/toolkit/query"
import { baseApi } from "./baseApi"

// export const store = legacy_createStore(rootReducer, {}, applyMiddleware(thunk))
export const store = configureStore({
  reducer: {
    [tasksSlice.name]: tasksReducer,
    [todolistsSlice.name]: todolistsReducer,
    [appSlice.name]: appReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(todolistsApi.middleware),
})
setupListeners(store.dispatch)

// определить автоматически тип всего объекта состояния
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootState, unknown, UnknownAction>
export type AppThunk = ThunkAction<void, RootState, unknown, UnknownAction>
// @ts-ignore
window.store = store
