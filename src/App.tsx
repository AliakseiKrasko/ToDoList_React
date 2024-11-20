import React, {useState} from 'react';
import './App.css';
import {InputHeader, TasksType} from "./InputHeader";
import {v1} from 'uuid';

export type FilterValueType = "all" | "active" | "completed" | "firstThree"
type TodoListsPropsType = {
    id: string
    title: string
    filter: FilterValueType
}

function App() {
    let [tasks, setTasks] = useState({
        [tasksId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JavaScript', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Redus', isDone: false},
        ],
        [tasksId2]: [
            {id: v1(), title: 'Book', isDone: true},
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Brot', isDone: false},
            {id: v1(), title: 'Koffe', isDone: false},
        ]
    })





    function removeTask(id: string): void {

        let filterTasks = tasks.filter(t => t.id !== id)
        setTasks(filterTasks);

    }

    function addTask(title: string): void {
        let newTask = {
            id: v1(),
            title: title,
            isDone: false
        };
        let newTasks = [newTask, ...tasks];
        setTasks(newTasks);
    }


    const toggleTaskStatus = (taskId: string, isDone: boolean) => {
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone;
        }
        setTasks([...tasks]);
    }

    const onAllClickHundler = () => {
        setTasks([])
    }

    function changeFilter(value: FilterValueType, todoListId: string) {
        let totdoList = todoLists.find(td => td.id === todoListId);
        if (totdoList) {
            totdoList.filter = value
            setTodoLists([...todoLists])
        }


    }

    let [todoLists, setTodoLists] = useState<Array<TodoListsPropsType>>([
        {id: v1(), title: "Wath to learn", filter: "active"},
        {id: v1(), title: "Wath to buy", filter: "completed"},
    ])


    return (
        <div className="App">
            {
                todoLists.map((el) => {
                    let tasksForTodoList = tasks;
                    if (el.filter === "completed") {
                        tasksForTodoList = tasks.filter(t => t.isDone === true)
                    }
                    if (el.filter === "active") {
                        tasksForTodoList = tasks.filter(t => t.isDone === false)
                    }
                    if (el.filter === "firstThree") {
                        tasksForTodoList = tasks.slice(0, 3)
                    }
                    return <InputHeader
                        key={el.id}
                        id={el.id}
                        title={el.title}
                        tasks={tasksForTodoList}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        toggleTaskStatus={toggleTaskStatus}
                        onAllClickHundler={onAllClickHundler}
                        filter={el.filter}
                    />
                })
            }

        </div>
    )
        ;

}

export default App;
