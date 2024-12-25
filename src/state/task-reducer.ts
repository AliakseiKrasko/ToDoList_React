import {TasksStateType} from '../App';

export type RemoveTaskActionsType = ReturnType<typeof removeTaskAC>

type ActionsType = RemoveTaskActionsType


export const taskReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case'REMOVE-TASK':
            return {
                    ...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .filter(t => t.id !== action.payload.id)
            };


        default:
            throw new Error("I don't understand this type")
    }
}

    export const removeTaskAC = (todolistId: string, id: string) => {
        return {
            type: 'REMOVE-TASK',
            payload: {todolistId, id},
        } as const;
    };


