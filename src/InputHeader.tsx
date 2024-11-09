import React, {useState} from "react";
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
}

export function InputHeader(props: PropsType) {
    const [tilleNewTask, setTilleNewTask] = useState('');

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={tilleNewTask} onChange={(e) => setTilleNewTask(e.currentTarget.value)} />
                <button onClick={()=> props.addTask(tilleNewTask) }>+</button>
            </div>
            <div>
                <ul>
                    {props.tasks.map(item => <li key={item.id}><input type="checkbox" checked={item.isDone} />
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

