import React, { useState } from 'react';
import './App.css';
import { TodoList, TasksType } from './TodoList';
import { v1 } from 'uuid';
import {AddItemForm} from './AddItemForm';

export type FilterValueType = 'all' | 'active' | 'completed' | 'firstThree';

type TodoListsPropsType = {
    id: string;
    title: string;
    filter: FilterValueType;
};

function App() {
    const tasksId1 = v1();
    const tasksId2 = v1();

    let [tasksObj, setTasksObj] = useState({
        [tasksId1]: [
            { id: v1(), title: 'HTML&CSS', isDone: true },
            { id: v1(), title: 'JavaScript', isDone: true },
            { id: v1(), title: 'React', isDone: false },
            { id: v1(), title: 'Redux', isDone: false },
        ],
        [tasksId2]: [
            { id: v1(), title: 'Book', isDone: true },
            { id: v1(), title: 'Milk', isDone: true },
            { id: v1(), title: 'Bread', isDone: false },
            { id: v1(), title: 'Coffee', isDone: false },
        ],
    });

    let [todoLists, setTodoLists] = useState<Array<TodoListsPropsType>>([
        { id: tasksId1, title: 'What to learn', filter: 'all' },
        { id: tasksId2, title: 'What to buy', filter: 'all' },
    ]);

    function removeTask(id: string, todoListId: string): void {
        setTasksObj(prevState => ({
            ...prevState,
            [todoListId]: prevState[todoListId].filter(t => t.id !== id),
        }));
    }

    function addTask(title: string, todoListId: string): void {
        const newTask = { id: v1(), title, isDone: false };
        setTasksObj(prevState => ({
            ...prevState,
            [todoListId]: [newTask, ...prevState[todoListId]],
        }));
    }

    const toggleTaskStatus = (taskId: string, isDone: boolean, todoListId: string): void => {
        setTasksObj(prevState => ({
            ...prevState,
            [todoListId]: prevState[todoListId].map(task =>
                task.id === taskId ? { ...task, isDone } : task
            ),
        }));
    };

    const onAllClickHundler = (todoListId: string): void => {
        setTasksObj(prevState => ({
            ...prevState,
            [todoListId]: [],
        }));
    };

    function changeFilter(value: FilterValueType, todoListId: string): void {
        setTodoLists(todoLists.map(tl =>
            tl.id === todoListId ? { ...tl, filter: value } : tl
        ));
    }
    function onDeletTodoList(todoListId: string) {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListId))

    }

    return (
        <div className="App">
            <AddItemForm addItem={(title: string)=>{alert(title)}} />
            {todoLists.map(tl => {
                let tasksForTodoList = tasksObj[tl.id];
                if (tl.filter === 'completed') {
                    tasksForTodoList = tasksObj[tl.id].filter(t => t.isDone);
                }
                if (tl.filter === 'active') {
                    tasksForTodoList = tasksObj[tl.id].filter(t => !t.isDone);
                }
                if (tl.filter === 'firstThree') {
                    tasksForTodoList = tasksObj[tl.id].slice(0, 3);
                }
                return (
                    <TodoList
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForTodoList}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        toggleTaskStatus={toggleTaskStatus}
                        onAllClickHundler={onAllClickHundler}
                        onDeletTodoList={onDeletTodoList}
                        filter={tl.filter}

                    />
                );
            })}
        </div>
    );
}

export default App;

