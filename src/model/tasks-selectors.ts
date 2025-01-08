import {RootState} from '../app/store';
import {TasksStateType} from '../app/App';

export const selectTask = (state: RootState): TasksStateType => state.tasks