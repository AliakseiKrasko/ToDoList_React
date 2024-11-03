import React, {useState} from 'react';
import './App.css';
import {InputHeader, TasksType} from "./InputHeader";







// let tasks2: Array<TasksType> = [
//     { id: 1, title: 'Troja', isDone: true },
//     { id: 2, title: 'XXX', isDone: false },
//     { id: 3, title: 'Terminator', isDone: true },
// ]



function App() {
    let [tasks, setTasks] = useState ([
        { id: 1, title: 'HTML&CSS', isDone: true },
        { id: 2, title: 'JavaScript', isDone: true },
        { id: 3, title: 'React', isDone: false },
    ]);

    function removeTask (id: number) {

        let filterTasks = tasks.filter(t => t.id !== id)
        setTasks(filterTasks);
    }

    return (
        <div className="App">
        <InputHeader title="Wath to learn" tasks={tasks} removeTask={removeTask} />
        {/*<InputHeader title="Movies" tasks={tasks2} />*/}

        </div>
    );

}

export default App;
