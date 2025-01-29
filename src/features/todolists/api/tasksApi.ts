import axios from 'axios';
import {GetTasksResponse, Task} from './tasksApi.types';
import {stat} from 'node:fs';
import {BaseResponse} from './todolistsApi.types';

const token = '06921f9d-5d6a-4cde-b24a-02816749f900';
const apiKey = '519e09f9-9dad-4c6c-8d50-5948d8b0629c';

const configs = {
    headers: {
        Authorization: `Bearer ${token}`,
        'API-KEY': apiKey
    }
}

export const tasksApi = {
    getTAsks(todolistId: string) {
        const promise = axios.get<GetTasksResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks`, configs)
        return promise
    },

    createTask(title: string, todolistId: string) {
        const promise = axios.post<BaseResponse<{ item: Task }>>(
            `https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks`,
            {title}, configs)
        return promise
    },

    removeTasks(taskId: string, todolistId: string) {
        const promise = axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks/${taskId}`, configs)
        return promise
    },
}