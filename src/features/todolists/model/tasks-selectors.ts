import {RootState} from '../../../app/store';
import {TasksStateType} from './task-reducer';

export const selectTasks = (state: RootState): TasksStateType => state.tasks