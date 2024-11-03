import React from "react";

export type TasksType = {
    id: number
    title: string
    isDone: boolean
}


type PropsType = {
    title: string
    tasks: Array<TasksType>
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
                    {props.tasks.map(item => <li> <input type="checkbox" checked={item.isDone}/>
                            <span>{item.title}</span>
                        </li>
                    )
                    }
                </ul>
            </div>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}