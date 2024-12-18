import {TodoListsPropsType} from '../App';


type ActionType = {
    type: string
    [key: string]: any
}


export const todolistsReducer = (state: Array<TodoListsPropsType>, action: ActionType): Array<TodoListsPropsType> => {
    switch (action.type) {

        default:
            throw new Error("I don't understand action type");
    }
}