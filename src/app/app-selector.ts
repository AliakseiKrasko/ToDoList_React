import { RequestStatus, ThemeMode } from "./app-reducer"
import type { RootState } from "./store"

export const selectThemeMode = (state: RootState): ThemeMode => state.app.themeMode
export const selectStatus = (state: RootState): RequestStatus => state.app.status
export const selectError = (state: RootState) => state.app.error
