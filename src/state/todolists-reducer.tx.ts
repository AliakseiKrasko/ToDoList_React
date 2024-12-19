import {TodoListsPropsType} from '../App';
import {v1} from 'uuid';


type ActionType = {
    type: string
    [key: string]: any
}


export const todolistsReducer = (state: Array<TodoListsPropsType>, action: ActionType): Array<TodoListsPropsType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(t => t.id !== action.id)
        case 'ADDED-TODOLIST': {
            return [...state, {
                id: v1(),
                title: action.title,
                filter: 'all',

            }]
        }

        default:
            throw new Error("I don't understand action type");
    }
}