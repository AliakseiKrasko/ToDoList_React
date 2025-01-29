// Типы
import {TaskStatus} from '../../../app/AppHttpRequests';

export type GetTasksResponse = {
    error: string | null;
    totalCount: number;
    items: Task[];
};

export type Task = {
    description: string | null;
    title: string;
    status: TaskStatus;
    priority: number;
    startDate: string | null;
    deadline: string | null;
    id: string;
    todoListId: string;
    order: number;
    addedDate: string;
};

export type UpdateTaskModel = {
    description: string | null;
    title: string;
    status: TaskStatus;
    priority: number;
    startDate: string | null;
    deadline: string | null;

}