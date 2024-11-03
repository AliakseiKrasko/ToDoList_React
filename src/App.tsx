import React, {useState} from 'react';
import './App.css';
import {InputHeader, TasksType} from "./InputHeader";

export type FilterValueType = "all" | "active" | "completed"


function App() {
    let [tasks, setTasks] = useState<Array<TasksType>>([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JavaScript', isDone: true},
        {id: 3, title: 'React', isDone: false},
        {id: 4, title: 'Redus', isDone: false},
    ]);
    let [filter, setFilter] = useState<FilterValueType>("all");


    function removeTask(id: number) {

        let filterTasks = tasks.filter(t => t.id !== id)
        setTasks(filterTasks);

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
            />
        </div>
    );

}

export default App;
