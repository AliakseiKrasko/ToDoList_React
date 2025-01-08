import {RootState} from '../app/store';
import {TodoListsPropsType} from '../app/App';


export const selectTodolists = (state: RootState): TodoListsPropsType[] => state.todolists