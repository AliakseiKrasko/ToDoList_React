import React from 'react';
import './App.css';
import {InputHeader, TasksType} from "./InputHeader";

let tasks1 = [
    { id: 1, title: 'HTML&CSS', isDone: true },
    { id: 2, title: 'JavaScript', isDone: true },
    { id: 3, title: 'React', isDone: false },
]

let tasks2: Array<TasksType> = [
    { id: 1, title: 'Troja', isDone: true },
    { id: 2, title: 'XXX', isDone: false },
    { id: 3, title: 'Terminator', isDone: true },
]

function App() {
    return (
        <div className="App">
        <InputHeader title="Wath to learn" tasks={tasks1} />
        <InputHeader title="Movies" tasks={tasks2} />

        </div>
    );

}

export default App;
