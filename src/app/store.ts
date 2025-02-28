import { applyMiddleware, combineReducers, legacy_createStore, UnknownAction } from "redux"

import { todolistsReducer } from "features/todolists/model/todolists-reducer"
import { thunk, ThunkAction, ThunkDispatch } from "redux-thunk"
import { appReducer } from "./app-reducer"
import { tasksReducer } from "../features/todolists/model/task-reducer"
import { authReducer } from "../features/auth/model/auth-reducer"
import { configureStore } from "@reduxjs/toolkit"

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
  app: appReducer,
  auth: authReducer,
})

// export const store = legacy_createStore(rootReducer, {}, applyMiddleware(thunk))
export const store = configureStore({ reducer: rootReducer })

// определить автоматически тип всего объекта состояния
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootState, unknown, UnknownAction>
export type AppThunk = ThunkAction<void, RootState, unknown, UnknownAction>
// @ts-ignore
window.store = store
