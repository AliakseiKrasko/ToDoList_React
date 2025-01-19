import Checkbox from '@mui/material/Checkbox'
import React, {ChangeEvent, useEffect, useState} from 'react'
import {AddItemForm} from '../common/components/AddItemForm/AddItemForm'
import {EditableSpan} from '../common/components/EditableSpan/EditableSpan'
import axios from 'axios';

export type Todolist = {
    id: string
    title: string
    addedDate: string
    order: number
}

type FieldError = {
    error: string
    field: string
}

type CreateTodolistResponse = {
    resultCode: number
    messages: string[]
    fieldsErrors: FieldError[]
    data: {
        item: Todolist
    }
}

export type removeTodolistDelete = {
    resultCode: number
    messages: string[]
    fieldsErrors: FieldError[]
    data: {
        item: Todolist
    }
}

export type updateTodolistCreate = {
    resultCode: number
    messages: string[]
    fieldsErrors: FieldError[]
    data: {
        item: Todolist
    }
}

export type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: DomainTask[]
}


export type DomainTask = {
    description: string
    title: string
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type CreateTaskResponse  = {
    resultCode: number
    messages: string[]
    fieldsErrors: FieldError[]
    data: {
        item: DomainTask[]
    }
}


export const AppHttpRequests = () => {
    const [todolists, setTodolists] = useState<Todolist[]>([])
    const [tasks, setTasks] = useState<{ [key: string]: DomainTask[] }>({})

    useEffect(() => {
        axios
            .get<Todolist[]>('https://social-network.samuraijs.com/api/1.1/todo-lists', {
                headers: {
                    Authorization: 'Bearer 06921f9d-5d6a-4cde-b24a-02816749f900',
                },
            })
            .then(res => {
                const todolists = res.data
                setTodolists(todolists)
                todolists.forEach(tl => {
                    axios
                        .get<GetTasksResponse>(
                            `https://social-network.samuraijs.com/api/1.1/todo-lists/${tl.id}/tasks`,
                            {
                                headers: {
                                    Authorization: 'Bearer 06921f9d-5d6a-4cde-b24a-02816749f900',
                                    'API-KEY': '519e09f9-9dad-4c6c-8d50-5948d8b0629c',
                                },
                            }
                        )
                        .then(res => {
                            setTasks({ ...tasks, [tl.id]: res.data.items })
                        })
                })
            })
    }, [])

    const createTodolistHandler = (title: string) => {
        axios
            .post<CreateTodolistResponse>('https://social-network.samuraijs.com/api/1.1/todo-lists',

                {title},
                {
                    headers: {
                        Authorization: 'Bearer 06921f9d-5d6a-4cde-b24a-02816749f900',
                        'API-KEY': '519e09f9-9dad-4c6c-8d50-5948d8b0629c',
                    },
                }
            )
            .then(res => {
                const newTodolist = res.data.data.item
                setTodolists([newTodolist, ...todolists])

            })
    }


    const removeTodolistHandler = (id: string) => {
        axios.delete<removeTodolistDelete>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`, {
            headers: {
                Authorization: 'Bearer 06921f9d-5d6a-4cde-b24a-02816749f900',
                'API-KEY': '519e09f9-9dad-4c6c-8d50-5948d8b0629c',
            },
        })
            .then(res => {
                setTodolists(todolists.filter(tl => tl.id !== id))
            })
    }

    const updateTodolistHandler = (id: string, title: string) => {
        axios.put<updateTodolistCreate>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`,
            {title}, {
                headers: {
                    Authorization: 'Bearer 06921f9d-5d6a-4cde-b24a-02816749f900',
                    'API-KEY': '519e09f9-9dad-4c6c-8d50-5948d8b0629c',
                },
            })
            .then(res => {
                setTodolists(todolists.map(tl => tl.id === id ? {...tl, title: title} : tl))
            })
    }

    const createTaskHandler = (title: string, todolistId: string) => {
        axios
            .post<CreateTaskResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks`,
                {title}, {
                headers: {
                    Authorization: 'Bearer 06921f9d-5d6a-4cde-b24a-02816749f900',
                    'API-KEY': '519e09f9-9dad-4c6c-8d50-5948d8b0629c',
                },
            })
            .then(res => {
                console.log(res.data.data.item)
                setTasks({ ...tasks, [title]: res.data.data.item })
            })
    }

    const removeTaskHandler = (taskId: string, todolistId: string) => {
        // remove task
    }

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>, task: any) => {
        // update task status
    }

    const changeTaskTitleHandler = (title: string, task: any) => {
        // update task title
    }

    return (
        <div style={{margin: '20px'}}>
            <AddItemForm addItem={createTodolistHandler}/>

            {/* Todolists */}
            {todolists.map(tl => {
                return (
                    <div key={tl.id} style={todolist}>
                        <div>
                            <EditableSpan
                                value={tl.title}
                                onChange={(title: string) => updateTodolistHandler(tl.id, title)}
                            />
                            <button onClick={() => removeTodolistHandler(tl.id)}>x</button>
                        </div>
                        <AddItemForm addItem={title => createTaskHandler(title, tl.id)}/>

                        {/* Tasks */}
                        {!!tasks[tl.id] &&
                            tasks[tl.id].map((task: any) => {
                                return (
                                    <div key={task.id}>
                                        <Checkbox
                                            checked={task.isDone}
                                            onChange={e => changeTaskStatusHandler(e, task)}
                                        />
                                        <EditableSpan
                                            value={task.title}
                                            onChange={title => changeTaskTitleHandler(title, task)}
                                        />
                                        <button onClick={() => removeTaskHandler(task.id, tl.id)}>x</button>
                                    </div>
                                )
                            })}
                    </div>
                )
            })}
        </div>
    )
}

// Styles
const todolist: React.CSSProperties = {
    border: '1px solid black',
    margin: '20px 0',
    padding: '10px',
    width: '300px',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
}