import axios from 'axios';
import {BaseResponse, Todolist} from './todolistsApi.types';


const token = '06921f9d-5d6a-4cde-b24a-02816749f900';
const apiKey = '519e09f9-9dad-4c6c-8d50-5948d8b0629c';

const configs = {
    headers: {
        Authorization: `Bearer ${token}`,
        'API-KEY': apiKey
    }
}

export const todolistsApi = {
    getTodolists() {
        const promise = axios.get<Todolist[]>('https://social-network.samuraijs.com/api/1.1/todo-lists', configs)
        return promise
    },

    updateTodolist(title: string) {
        const promise = axios.post<BaseResponse<{ item: Todolist }>>(
            'https://social-network.samuraijs.com/api/1.1/todo-lists',
            {title}, configs)
        return promise
    }
}