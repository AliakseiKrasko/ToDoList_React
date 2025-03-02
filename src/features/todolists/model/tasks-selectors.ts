import { RootState } from "../../../app/store"
import { TasksStateType } from "./taskSlice"

export const selectTasks = (state: RootState): TasksStateType => state.tasks
