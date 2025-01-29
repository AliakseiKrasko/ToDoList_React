import Checkbox from '@mui/material/Checkbox';
import React, {ChangeEvent, useEffect, useState} from 'react';
import {AddItemForm} from '../common/components/AddItemForm/AddItemForm';
import {EditableSpan} from '../common/components/EditableSpan/EditableSpan';
import axios from 'axios';
import {BaseResponse, Todolist} from '../features/todolists/api/todolistsApi.types';
import {GetTasksResponse, Task, UpdateTaskModel} from '../features/todolists/api/tasksApi.types';
import {todolistsApi} from '../features/todolists/api/todolistsApi';


const token = '06921f9d-5d6a-4cde-b24a-02816749f900';
const apiKey = '519e09f9-9dad-4c6c-8d50-5948d8b0629c';

const configs = {
    headers: {
        Authorization: `Bearer ${token}`,
        'API-KEY': apiKey
    }
}

// Компонент
export const AppHttpRequests = () => {
    const [todolists, setTodolists] = useState<Todolist[]>([]);
    const [tasks, setTasks] = useState<{ [key: string]: Task[] }>({});

    // Получение данных при загрузке
    useEffect(() => {
        todolistsApi.getTodolists()
            .then(res => {
                setTodolists(res.data);
                res.data.forEach(tl => {
                    fetchTasks(tl.id);
                });
            })
            .catch(err => console.error('Failed to fetch todolists:', err));
    }, []);

    // Функция получения задач для конкретного списка
    const fetchTasks = (todolistId: string) => {
        axios
            .get<GetTasksResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks`, configs)
            .then(res => {
                setTasks(prevTasks => ({
                    ...prevTasks,
                    [todolistId]: res.data.items,
                }));
            })
            .catch(err => console.error(`Failed to fetch tasks for todolist ${todolistId}:`, err));
    };

    // Добавление нового списка задач
    const createTodolistHandler = (title: string) => {
        axios
            .post<BaseResponse<{ item: Todolist }>>(
                'https://social-network.samuraijs.com/api/1.1/todo-lists',
                {title}, configs)
            .then(res => {
                setTodolists([res.data.data.item, ...todolists]);
            })
            .catch(err => console.error('Failed to create todolist:', err));
    };

    // Удаление списка задач
    const removeTodolistHandler = (id: string) => {
        axios
            .delete<BaseResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`, configs)
            .then(() => {
                setTodolists(todolists.filter(tl => tl.id !== id));
                setTasks(prevTasks => {
                    const {[id]: _, ...remainingTasks} = prevTasks;
                    return remainingTasks;
                });
            })
            .catch(err => console.error('Failed to remove todolist:', err));
    };

    // Обновление названия списка задач
    const updateTodolistHandler = (id: string, title: string) => {
        axios
            .put<BaseResponse>(
                `https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`,
                {title}, configs)
            .then(() => {
                setTodolists(todolists.map(tl => (tl.id === id ? {...tl, title} : tl)));
            })
            .catch(err => console.error('Failed to update todolist:', err));
    };

    // Создание задачи
    const createTaskHandler = (title: string, todolistId: string) => {
        axios
            .post<BaseResponse<{ item: Task }>>(
                `https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks`,
                {title}, configs)
            .then(res => {
                setTasks(prevTasks => ({
                    ...prevTasks,
                    [todolistId]: [res.data.data.item, ...(prevTasks[todolistId] || [])],
                }));
            })
            .catch(err => console.error('Failed to create task:', err));
    };

    // Удаление задачи
    const removeTaskHandler = (taskId: string, todolistId: string) => {
        axios
            .delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks/${taskId}`, configs)
            .then(() => {
                setTasks(prevTasks => ({
                    ...prevTasks,
                    [todolistId]: (prevTasks[todolistId] || []).filter(task => task.id !== taskId),
                }));
            })
            .catch(err => console.error('Failed to remove task:', err));
    };

    // Изменение статуса задачи
    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>, task: Task) => {

        const model: UpdateTaskModel = {
            description: task.description,
            title: task.title,
            deadline: task.deadline,
            priority: task.priority,
            startDate: task.startDate,
            status: e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
        }

        axios
            .put<BaseResponse>(
                `https://social-network.samuraijs.com/api/1.1/todo-lists/${task.todoListId}/tasks/${task.id}`,
                model, configs)
            .then(() => {
                setTasks(prevTasks => ({
                    ...prevTasks,
                    [task.todoListId]: (prevTasks[task.todoListId] || []).map(t =>
                        t.id === task.id ? {...t, status: model.status} : t
                    ),
                }));
            })
            .catch(err => console.error('Failed to update task status:', err));
    }



const changeTaskTitleHandler = (taskId: string, todolistId: string, newTitle: string) => {
    const taskToUpdate = tasks[todolistId]?.find(task => task.id === taskId);

    if (taskToUpdate) {
        const updatedTask = {
            ...taskToUpdate,
            title: newTitle,
        };

        axios
            .put(
                `https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks/${taskId}`,
                updatedTask, configs)
            .then(() => {
                setTasks(prevTasks => ({
                    ...prevTasks,
                    [todolistId]: (prevTasks[todolistId] || []).map(task =>
                        task.id === taskId ? {...task, title: newTitle} : task
                    ),
                }));
            })
            .catch(err => console.error('Failed to update task title:', err));
    }
};


return (
    <div style={{margin: '20px'}}>
        <AddItemForm addItem={createTodolistHandler}/>
        {todolists.map(tl => (
            <div key={tl.id} style={todolist}>
                <div>
                    <EditableSpan value={tl.title} onChange={title => updateTodolistHandler(tl.id, title)}/>
                    <button onClick={() => removeTodolistHandler(tl.id)}>x</button>
                </div>
                <AddItemForm addItem={title => createTaskHandler(title, tl.id)}/>
                {!!tasks[tl.id] &&
                    tasks[tl.id].map(task => (
                        <div key={task.id}>
                            <Checkbox
                                checked={task.status === TaskStatus.Completed} // Предполагается, что 2 — статус "выполнено"
                                onChange={e => changeTaskStatusHandler(e, task)}
                            />
                            <EditableSpan
                                value={task.title}
                                onChange={newTitle => changeTaskTitleHandler(task.id, tl.id, newTitle)}
                            />
                            <button onClick={() => removeTaskHandler(task.id, tl.id)}>Х</button>
                        </div>
                    ))}
            </div>
        ))}
    </div>
);
}
;

export enum TaskStatus {
    New = 0,
    InProgress = 1,
    Completed = 2
}


// Стили
const todolist: React.CSSProperties = {
    border: '1px solid black',
    margin: '20px 0',
    padding: '10px',
    width: '300px',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
};
