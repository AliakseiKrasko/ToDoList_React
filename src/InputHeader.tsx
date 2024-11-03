import React from "react";
import {FilterValueType} from './App';

export type TasksType = {
    id: number
    title: string
    isDone: boolean
}


type PropsType = {
    title: string
    tasks: Array<TasksType>
    removeTask: (id: number) => void;
    changeFilter: (value: FilterValueType) => void;
}

export function InputHeader(props: PropsType) {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <div>
                <ul>
                    {props.tasks.map(item => <li><input type="checkbox" checked={item.isDone}/>
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