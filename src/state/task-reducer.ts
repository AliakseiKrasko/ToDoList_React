import {TasksStateType} from '../App';
import {v1} from 'uuid';

export type RemoveTaskActionsType = ReturnType<typeof removeTaskAC>
export type AddTaskActionsType = ReturnType<typeof addTaskAC>

type ActionsType = RemoveTaskActionsType | AddTaskActionsType


export const taskReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case'REMOVE-TASK':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .filter(t => t.id !== action.payload.id)
            };
        case 'ADD-TASK':
            const newTask = {id: v1(), title: action.payload.title, isDone: false};
            return {
                ...state,
                [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]
            }


        default:
            throw new Error("I don't understand this type")
    }
}

export const removeTaskAC = (payload: { todolistId: string, id: string }) => {
    return {
        type: 'REMOVE-TASK',
        payload,
    } as const;
};

export const addTaskAC = (payload: { title: string, todolistId: string}) => {
    return {
        type: 'ADD-TASK',
        payload,
    } as const;
}


