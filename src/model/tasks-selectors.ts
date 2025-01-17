import {RootState} from '../app/store';
import {TasksStateType} from '../model/task-reducer';

export const selectTasks = (state: RootState): TasksStateType => state.tasks