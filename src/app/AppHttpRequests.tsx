import Checkbox from '@mui/material/Checkbox';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { AddItemForm } from '../common/components/AddItemForm/AddItemForm';
import { EditableSpan } from '../common/components/EditableSpan/EditableSpan';
import axios from 'axios';

// Типы
export type Todolist = {
    id: string;
    title: string;
    addedDate: string;
    order: number;
};

type FieldError = {
    error: string;
    field: string;
};

type CreateTodolistResponse = {
    resultCode: number;
    messages: string[];
    fieldsErrors: FieldError[];
    data: {
        item: Todolist;
    };
};

export type RemoveTodolistResponse = {
    resultCode: number;
    messages: string[];
    fieldsErrors: FieldError[];
    data: {};
};

export type UpdateTodolistResponse = {
    resultCode: number;
    messages: string[];
    fieldsErrors: FieldError[];
    data: {};
};

export type GetTasksResponse = {
    error: string | null;
    totalCount: number;
    items: DomainTask[];
};

export type DomainTask = {
    description: string;
    title: string;
    status: number;
    priority: number;
    startDate: string;
    deadline: string;
    id: string;
    todoListId: string;
    order: number;
    addedDate: string;
};

export type CreateTaskResponse = {
    resultCode: number;
    messages: string[];
    fieldsErrors: FieldError[];
    data: {
        item: DomainTask;
    };
};

// Компонент
export const AppHttpRequests = () => {
    const [todolists, setTodolists] = useState<Todolist[]>([]);
    const [tasks, setTasks] = useState<{ [key: string]: DomainTask[] }>({});

    // Получение данных при загрузке
    useEffect(() => {
        axios
            .get<Todolist[]>('https://social-network.samuraijs.com/api/1.1/todo-lists', {
                headers: {
                    Authorization: 'Bearer 06921f9d-5d6a-4cde-b24a-02816749f900',
                },
            })
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
            .get<GetTasksResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks`, {
                headers: {
                    Authorization: 'Bearer 06921f9d-5d6a-4cde-b24a-02816749f900',
                    'API-KEY': '519e09f9-9dad-4c6c-8d50-5948d8b0629c',
                },
            })
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
            .post<CreateTodolistResponse>(
                'https://social-network.samuraijs.com/api/1.1/todo-lists',
                { title },
                {
                    headers: {
                        Authorization: 'Bearer 06921f9d-5d6a-4cde-b24a-02816749f900',
                        'API-KEY': '519e09f9-9dad-4c6c-8d50-5948d8b0629c',
                    },
                }
            )
            .then(res => {
                setTodolists([res.data.data.item, ...todolists]);
            })
            .catch(err => console.error('Failed to create todolist:', err));
    };

    // Удаление списка задач
    const removeTodolistHandler = (id: string) => {
        axios
            .delete<RemoveTodolistResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`, {
                headers: {
                    Authorization: 'Bearer 06921f9d-5d6a-4cde-b24a-02816749f900',
                    'API-KEY': '519e09f9-9dad-4c6c-8d50-5948d8b0629c',
                },
            })
            .then(() => {
                setTodolists(todolists.filter(tl => tl.id !== id));
                setTasks(prevTasks => {
                    const { [id]: _, ...remainingTasks } = prevTasks;
                    return remainingTasks;
                });
            })
            .catch(err => console.error('Failed to remove todolist:', err));
    };

    // Обновление названия списка задач
    const updateTodolistHandler = (id: string, title: string) => {
        axios
            .put<UpdateTodolistResponse>(
                `https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`,
                { title },
                {
                    headers: {
                        Authorization: 'Bearer 06921f9d-5d6a-4cde-b24a-02816749f900',
                        'API-KEY': '519e09f9-9dad-4c6c-8d50-5948d8b0629c',
                    },
                }
            )
            .then(() => {
                setTodolists(todolists.map(tl => (tl.id === id ? { ...tl, title } : tl)));
            })
            .catch(err => console.error('Failed to update todolist:', err));
    };

    // Создание задачи
    const createTaskHandler = (title: string, todolistId: string) => {
        axios
            .post<CreateTaskResponse>(
                `https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks`,
                { title },
                {
                    headers: {
                        Authorization: 'Bearer 06921f9d-5d6a-4cde-b24a-02816749f900',
                        'API-KEY': '519e09f9-9dad-4c6c-8d50-5948d8b0629c',
                    },
                }
            )
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
            .delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks/${taskId}`, {
                headers: {
                    Authorization: 'Bearer 06921f9d-5d6a-4cde-b24a-02816749f900',
                    'API-KEY': '519e09f9-9dad-4c6c-8d50-5948d8b0629c',
                },
            })
            .then(() => {
                setTasks(prevTasks => ({
                    ...prevTasks,
                    [todolistId]: (prevTasks[todolistId] || []).filter(task => task.id !== taskId),
                }));
            })
            .catch(err => console.error('Failed to remove task:', err));
    };

    // Изменение статуса задачи
    const changeTaskStatusHandler = (taskId: string, todolistId: string, status: number) => {
        const taskToUpdate = tasks[todolistId]?.find(task => task.id === taskId);

        if (taskToUpdate) {
            const updatedTask = {
                ...taskToUpdate,
                status,
            };

            axios
                .put(
                    `https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks/${taskId}`,
                    updatedTask,
                    {
                        headers: {
                            Authorization: 'Bearer 06921f9d-5d6a-4cde-b24a-02816749f900',
                            'API-KEY': '519e09f9-9dad-4c6c-8d50-5948d8b0629c',
                        },
                    }
                )
                .then(() => {
                    setTasks(prevTasks => ({
                        ...prevTasks,
                        [todolistId]: (prevTasks[todolistId] || []).map(task =>
                            task.id === taskId ? { ...task, status } : task
                        ),
                    }));
                })
                .catch(err => console.error('Failed to update task status:', err));
        }
    };


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
                    updatedTask,
                    {
                        headers: {
                            Authorization: 'Bearer 06921f9d-5d6a-4cde-b24a-02816749f900',
                            'API-KEY': '519e09f9-9dad-4c6c-8d50-5948d8b0629c',
                        },
                    }
                )
                .then(() => {
                    setTasks(prevTasks => ({
                        ...prevTasks,
                        [todolistId]: (prevTasks[todolistId] || []).map(task =>
                            task.id === taskId ? { ...task, title: newTitle } : task
                        ),
                    }));
                })
                .catch(err => console.error('Failed to update task title:', err));
        }
    };




    return (
        <div style={{ margin: '20px' }}>
            <AddItemForm addItem={createTodolistHandler} />
            {todolists.map(tl => (
                <div key={tl.id} style={todolist}>
                    <div>
                        <EditableSpan value={tl.title} onChange={title => updateTodolistHandler(tl.id, title)} />
                        <button onClick={() => removeTodolistHandler(tl.id)}>x</button>
                    </div>
                    <AddItemForm addItem={title => createTaskHandler(title, tl.id)} />
                    {!!tasks[tl.id] &&
                        tasks[tl.id].map(task => (
                            <div key={task.id}>
                                <Checkbox
                                    checked={task.status === 2} // Предполагается, что 2 — статус "выполнено"
                                    onChange={e => changeTaskStatusHandler(task.id, tl.id, e.target.checked ? 2 : 0)}
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
};

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
