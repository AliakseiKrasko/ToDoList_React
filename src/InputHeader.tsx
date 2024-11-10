import React, {ChangeEvent, useState} from "react";
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
    const [titleNewTask, setTilleNewTask] = useState('');

    const onChangeHundler = (e: ChangeEvent<HTMLInputElement>) => {
        setTilleNewTask(e.currentTarget.value)
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={titleNewTask} onChange={
                    onChangeHundler
                }
                       onKeyDown={(e)=> {
                           if(e.key === 'Enter') {
                               props.addTask(titleNewTask);
                               setTilleNewTask('');
                           }
                       }}/>
                <button onClick={
                    ()=> {props.addTask(titleNewTask);
                        setTilleNewTask('');
                    }}>+</button>
            </div>
            <div>
                <ul>
                    {props.tasks.map(item => <li key={item.id}><input type="checkbox" checked={item.isDone} onChange={()=>props.toggleTaskStatus(item.id)}/>
                            <span>{item.title}</span>
                            <button onClick = {()=> {props.removeTask(item.id)}}>X</button>
                        </li>
                    )
                    }
                </ul>
            </div>
            <div>
                <button onClick={()=>{props.changeFilter("all")}}>All</button>
                <button onClick={()=>{props.changeFilter("active")}}>Active</button>
                <button onClick={()=>{props.changeFilter("completed")}}>Completed</button>
            </div>
        </div>
    )
}

