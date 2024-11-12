import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValueType} from './App';
import {Simulate} from 'react-dom/test-utils';
import error = Simulate.error;

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
    onAllClickHundler: () => void;

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
    const onAllClickHundler = () => props.changeFilter("all")
    const onActiveClickHundler = () => props.changeFilter("active")
    const onCompletedClickHundler = () => props.changeFilter("completed")
    const onFirstThreeClickHundler = () => props.changeFilter("firstThree")


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={titleNewTask} onChange={onChangeHundler}
                       onKeyDown={onKeyDownHundler} className={error ? "error" : ""}/>
                <button onClick={onClickHundler}>+</button>
                {error && <div className="error-message">{error}</div>}
            </div>
            <button onClick={props.onAllClickHundler}>Delete All Tasks</button>
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
                <button onClick={onFirstThreeClickHundler}>First Three</button>
            </div>
        </div>
    )
}

