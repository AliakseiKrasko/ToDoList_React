import React, {ChangeEvent, ChangeEventHandler, KeyboardEvent, useState} from "react";
import {FilterValueType} from './App';
import {Simulate} from 'react-dom/test-utils';
import error = Simulate.error;
import {Button} from './Button';

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}


type PropsType = {
    id: string
    title: string
    tasks: Array<TasksType>
    removeTask: (id: string) => void;
    changeFilter: (value: FilterValueType, todoListId: string) => void;
    addTask: (title: string) => void;
    toggleTaskStatus: (id: string, isDone: boolean) => void;
    onAllClickHundler: () => void;
    filter: FilterValueType
}

export function InputHeader(props: PropsType) {
    const [titleNewTask, setTitlleNewTask] = useState('');
    let [error, setError] = useState<string | null>(null);

    const onChangeHundler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitlleNewTask(e.currentTarget.value)
    }
    const onKeyDownHundler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter') {
            if(titleNewTask.trim() !== '') {
                props.addTask(titleNewTask);
                setTitlleNewTask('')
            } else {
                setError("Title is required");
            }
        }
    }
    const onClickHundler = () => {
        if(titleNewTask.trim() !== '') {
            props.addTask(titleNewTask);
            setTitlleNewTask('')
        } else {
            setError("Title is required");
        }

    }
    const onAllClickHundler = () => props.changeFilter("all", props.id)
    const onActiveClickHundler = () => props.changeFilter("active", props.id)
    const onCompletedClickHundler = () => props.changeFilter("completed", props.id)
    const onFirstThreeClickHundler = () => props.changeFilter("firstThree", props.id)


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={titleNewTask} onChange={onChangeHundler}
                       onKeyDown={onKeyDownHundler} className={error ? "error" : ""}/>
                <button onClick={onClickHundler}>+</button>
                {/*<Button title={'+'} onClick={onClickHundler} />*/}
                {error && <div className="error-message">{error}</div>}
            </div>
            <button onClick={props.onAllClickHundler}>Delete All Tasks</button>
            <div>
                <ul>
                    {props.tasks.map(item => {
                        const onRemoveHandler = () => props.removeTask(item.id)
                        const toggleTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
                            props.toggleTaskStatus(item.id, e.target.checked)
                        }

                        return <li key={item.id} className={item.isDone ? "is-done" : ""}>
                            <input type="checkbox" checked={item.isDone}
                                   onChange={toggleTaskStatus}/>
                            <span>{item.title}</span>
                            {/*<Button title={'X'} onClick={onRemoveHandler} />*/}
                            <button onClick={onRemoveHandler}
                            >X
                            </button>
                        </li>
                    })}
                </ul>
            </div>
            <div>
                <button className={props.filter === "all" ? "filter-button" : ""} onClick={onAllClickHundler}>All</button>
                <button className={props.filter === "active" ? "filter-button" : ""} onClick={onActiveClickHundler}>Active</button>
                <button className={props.filter === "completed" ? "filter-button" : ""} onClick={onCompletedClickHundler}>Completed</button>
                <button className={props.filter === "firstThree" ? "filter-button" : ""} onClick={onFirstThreeClickHundler}>First Three</button>
            </div>
        </div>
    )
}

