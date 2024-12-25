import React, {useState} from 'react';
import './App.css';
import {TodoList, TasksType} from './TodoList';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import {AppBar, Button, Container, Grid, Grid2, IconButton, Paper, Toolbar} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'

export type FilterValueType = 'all' | 'active' | 'completed' | 'firstThree';

export type TodoListsPropsType = {
    id: string;
    title: string;
    filter: FilterValueType;
};

export type TasksStateType = {
    [key: string]: Array<TasksType>;
}

function App() {
    const tasksId1 = v1();
    const tasksId2 = v1();

    let [tasksObj, setTasksObj] = useState<TasksStateType>({
        [tasksId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JavaScript', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Redux', isDone: false},
        ],
        [tasksId2]: [
            {id: v1(), title: 'Book', isDone: true},
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Bread', isDone: false},
            {id: v1(), title: 'Coffee', isDone: false},
        ],
    });

    let [todoLists, setTodoLists] = useState<Array<TodoListsPropsType>>([
        {id: tasksId1, title: 'What to learn', filter: 'all'},
        {id: tasksId2, title: 'What to buy', filter: 'all'},
    ]);

    function removeTask(id: string, todoListId: string): void {
        setTasksObj(prevState => ({
            ...prevState,
            [todoListId]: prevState[todoListId].filter(t => t.id !== id),
        }));
    }

    function addTask(title: string, todoListId: string): void {
        const newTask = {id: v1(), title, isDone: false};
        setTasksObj(prevState => ({
            ...prevState,
            [todoListId]: [newTask, ...prevState[todoListId]],
        }));
    }

    const toggleTaskStatus = (taskId: string, isDone: boolean, todoListId: string): void => {
        setTasksObj(prevState => ({
            ...prevState,
            [todoListId]: prevState[todoListId].map(task =>
                task.id === taskId ? {...task, isDone} : task
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
            tl.id === todoListId ? {...tl, filter: value} : tl
        ));
    }

    function onDeletTodoList(todoListId: string) {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListId))

    }

    function addTodoList(title: string) {
        let todolist: TodoListsPropsType = {
            id: v1(),
            title: title,
            filter: "all"
        }
        setTodoLists([todolist, ...todoLists])
        setTasksObj({...tasksObj, [todolist.id]: []})
    }

    function ChangeTaskTitle(taskId: string, newTitle: string, todoListId: string): void {
        setTasksObj(prevState => ({
            ...prevState,
            [todoListId]: prevState[todoListId].map(task =>
                task.id === taskId ? {...task, title: newTitle} : task
            ),
        }));
    }

    function changeTodoLiistTitle(id: string, newTitle: string) {
        const todolist = todoLists.find(tl => tl.id === id);
        if (todolist) {
            todolist.title = newTitle;
            setTodoLists([...todoLists])
        }
    }

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <IconButton color="inherit">
                        <MenuIcon/>
                    </IconButton>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid2 container spacing={3} style={{padding:'20px'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid2>
                <Grid2 container spacing={3}>
                    {todoLists.map(tl => {
                        let tasksForTodoList = tasksObj[tl.id];
                        if (tl.filter === 'completed') {
                            tasksForTodoList = tasksObj[tl.id].filter(t => t.isDone);
                        }
                        if (tl.filter === 'active') {
                            tasksForTodoList = tasksObj[tl.id].filter(t => !t.isDone);
                        }

                        return (
                            <Grid2>
                                <Paper style={{padding: '10px'}}>
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
                                        ChangeTaskTitle={ChangeTaskTitle}
                                        changeTodoLiistTitle={changeTodoLiistTitle}
                                    />
                                </Paper>

                            </Grid2>

                        );
                    })}
                </Grid2>


            </Container>

        </div>
    )
        ;
}

export default App;

