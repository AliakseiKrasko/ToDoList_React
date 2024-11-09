import React, {useState} from 'react';
import './App.css';
import {InputHeader, TasksType} from "./InputHeader";
import {v1} from 'uuid';

export type FilterValueType = "all" | "active" | "completed"


function App() {
    let [tasks, setTasks] = useState<Array<TasksType>>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JavaScript', isDone: true},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'Redus', isDone: false},
    ]);

    let [filter, setFilter] = useState<FilterValueType>("all");


    function removeTask(id: string): void {

        let filterTasks = tasks.filter(t => t.id !== id)
        setTasks(filterTasks);

    }

    function addTask (title: string): void {
        let newTask = {
            id: v1(),
            title: title,
            isDone: false
        };
        let newTasks = [newTask, ...tasks];
        setTasks(newTasks);
    }

    function changeFilter(value: FilterValueType) {
        setFilter(value);
    }

    let tasksForTodoList = tasks;
    if (filter === "completed") {
        tasksForTodoList = tasks.filter(t => t.isDone === true)
    }
    if (filter === "active") {
        tasksForTodoList = tasks.filter(t => t.isDone === false)
    }


    return (
        <div className="App">
            <InputHeader title="Wath to learn"
                         tasks={tasksForTodoList}
                         removeTask={removeTask}
                         changeFilter={changeFilter}
                         addTask={addTask}
            />
        </div>
    );

}

export default App;
