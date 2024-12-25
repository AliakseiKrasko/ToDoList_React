import {TasksStateType} from '../App';
import {v1} from 'uuid';

export type RemoveTaskActionsType = ReturnType<typeof removeTaskAC>
export type AddTaskActionsType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusActionsType = ReturnType<typeof changeTaskStatusAC>
export type changeTaskTitleActionsType = ReturnType<typeof changeTaskTitleAC>
export type AddTodolistActionsType = ReturnType<typeof addTodolistAC>
export type RemoveTodolistActionsType = ReturnType<typeof removeTodolistAC>

type ActionsType =
    RemoveTaskActionsType
    | AddTaskActionsType
    | ChangeTaskStatusActionsType
    | changeTaskTitleActionsType
    | AddTodolistActionsType
    | RemoveTodolistActionsType


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
                        ? {...task, isDone: action.payload.isDone}
                        : task
                )
            };
        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.payload.todoListId]: state[action.payload.todoListId].map(task =>
                    task.id === action.payload.id ? {...task, title: action.payload.newTitle} : task
                )
            }
        case 'ADD-TODOLIST':
            return {...state, [action.payload.todolistId]: []}

        case 'REMOVE-TODOLIST':
            const stateCopy = { ...state }
            delete stateCopy[action.todolistId];
            return stateCopy;


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

export const addTaskAC = (payload: { title: string, todolistId: string }) => {
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

export const changeTaskTitleAC = (payload: { id: string, newTitle: string, todoListId: string }) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload,
    } as const;
}

export const addTodolistAC = (title: string) => {

    return {
        type: 'ADD-TODOLIST',
        payload: {title, todolistId: v1()}
    } as const;
}

export const removeTodolistAC = (todolistId: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        todolistId,
    } as const;
}
