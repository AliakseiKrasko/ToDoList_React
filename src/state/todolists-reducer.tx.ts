import {TodoListsPropsType} from '../App';


type ActionType = {
    type: string
    [key: string]: any
}


export const todolistsReducer = (state: Array<TodoListsPropsType>, action: ActionType): Array<TodoListsPropsType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(t => t.id !== action.id)
        default:
            throw new Error("I don't understand action type");
    }
}