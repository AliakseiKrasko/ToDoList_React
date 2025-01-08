import {TodoListsPropsType} from '../App';
import {v1} from 'uuid';
import {FilterValueType} from '../App';

export type RemoveTodolistsActionType = {
    type: 'REMOVE-TODOLIST'
    payload: {
        id: string
    }
}

export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    payload: {
        title: string
        todolistId: string
    }
}

export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    payload: {
        id: string
        title: string
    }
}

export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    payload: {
        id: string
        filter: FilterValueType
    }
}

type ActionsType =
    | RemoveTodolistsActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType

const initialState: TodoListsPropsType[] = []

export const todolistsReducer = (state: TodoListsPropsType[] = initialState, action: ActionsType): Array<TodoListsPropsType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(t => t.id !== action.payload.id)
        }
        case 'ADD-TODOLIST': {
            return [...state, {
                id: action.payload.todolistId,
                title: action.payload.title,
                filter: 'all',

            }]
        }

        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.payload.id);
            if (todolist) {
                todolist.title = action.payload.title;

            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(tl => tl.id === action.payload.id);
            if (todolist) {
                todolist.filter = action.payload.filter;

            }
            return [...state]
        }

        default:
            return state
    }
}

export const removeTodolistsAC = (todolistId: string): RemoveTodolistsActionType => {
    return { type: 'REMOVE-TODOLIST', payload: { id: todolistId } }
}

export const addTodolistAC = (title: string) => {
    return { type: 'ADD-TODOLIST', payload: { title, todolistId: v1() } } as const
}

export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return { type: 'CHANGE-TODOLIST-TITLE', payload: { id: id, title: title } }
}

export const changeTodolistFilterAC = (filter: FilterValueType, id: string): ChangeTodolistFilterActionType => {
    return { type: 'CHANGE-TODOLIST-FILTER', payload: { filter: filter, id: id } }
}