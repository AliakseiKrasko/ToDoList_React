import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValueType} from './App';

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}


type PropsType = {
    title: string
    tasks: Array<TasksType>
    removeTask: (id: string) => void;
    changeFilter: (value: FilterValueType) => void;
    addTask: (title: string) => void;
    toggleTaskStatus: (id: string) => void;
}

export function InputHeader(props: PropsType) {
    const [titleNewTask, setTitlleNewTask] = useState('');

    const onChangeHundler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitlleNewTask(e.currentTarget.value)
    }
    const onKeyDownHundler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            props.addTask(titleNewTask);
            setTitlleNewTask('');
        }
    }
    const onClickHundler = () => {
        props.addTask(titleNewTask);
        setTitlleNewTask('')
    }
    const onAllClickHundler = () => props.changeFilter("all")
    const onActiveClickHundler = () => props.changeFilter("active")
    const onCompletedClickHundler = () => props.changeFilter("completed")


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={titleNewTask} onChange={onChangeHundler}
                       onKeyDown={onKeyDownHundler}/>
                <button onClick={onClickHundler}>+</button>
            </div>
            <div>
                <ul>
                    {props.tasks.map(item => {
                        const onRemoveHandler = () => props.removeTask(item.id)


                        return <li key={item.id}>
                            <input type="checkbox" checked={item.isDone}
                                   onChange={() => props.toggleTaskStatus(item.id)}/>
                            <span>{item.title}</span>
                            <button onClick={onRemoveHandler}
                            >X
                            </button>
                        </li>
                    })}
                </ul>
            </div>
            <div>
                <button onClick={onAllClickHundler}>All</button>
                <button onClick={onActiveClickHundler}>Active</button>
                <button onClick={onCompletedClickHundler}>Completed</button>
            </div>
        </div>
    )
}

