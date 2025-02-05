import { applyMiddleware, combineReducers, legacy_createStore, UnknownAction } from "redux"

import { todolistsReducer } from "features/todolists/model/todolists-reducer"
import { thunk, ThunkDispatch } from "redux-thunk"
import { appReducer } from "./app-reducer"
import { tasksReducer } from "../features/todolists/model/task-reducer"

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
  app: appReducer,
})

export const store = legacy_createStore(rootReducer, {}, applyMiddleware(thunk))

// определить автоматически тип всего объекта состояния
export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch
// Создаем тип диспатча который принимает как AC так и TC
export type AppDispatch = ThunkDispatch<RootState, unknown, UnknownAction>
// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store
