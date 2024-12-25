import {TasksStateType} from '../App';
import {v1} from 'uuid';

export type RemoveTaskActionsType = ReturnType<typeof removeTaskAC>
export type AddTaskActionsType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusActionsType = ReturnType<typeof changeTaskStatusAC>

type ActionsType = RemoveTaskActionsType | AddTaskActionsType | ChangeTaskStatusActionsType


export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
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
        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.payload.todoListId]: state[action.payload.todoListId].map(task =>
                    task.id === action.payload.id
                        ? { ...task, isDone: action.payload.isDone }
                        : task
                )
            };


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

export const changeTaskStatusAC = (payload: { id: string, isDone: boolean, todoListId: string }) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload,
    } as const;
}


