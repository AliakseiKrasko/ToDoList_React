import {RootState} from '../app/store';
import {TodolistType} from '../model/todolists-reducer';


export const selectTodolists = (state: RootState): TodolistType[] => state.todolists