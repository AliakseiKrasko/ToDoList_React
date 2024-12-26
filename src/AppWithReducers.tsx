import React, {useReducer} from 'react';
import './App.css';
import {TodoList, TasksType} from './TodoList';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import {AppBar, Button, Container, Grid2, IconButton, Paper, Toolbar} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'
import {removeTodolistAC, todolistsReducer} from './state/todolists-reducer.tx';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './state/task-reducer';

export type FilterValueType = 'all' | 'active' | 'completed' | 'firstThree';

export type TodoListsPropsType = {
    id: string;
    title: string;
    filter: FilterValueType;
};

export type TasksStateType = {
    [key: string]: Array<TasksType>;
}

function AppWithReducers() {
    const todolistId1 = v1();
    const todolistId2 = v1();

    let [tasks, dispatchToTasksReducer] = useReducer(tasksReducer, {
        [todolistId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JavaScript', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Redux', isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: 'Book', isDone: true},
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Bread', isDone: false},
            {id: v1(), title: 'Coffee', isDone: false},
        ],
    });

    let [todoLists, dispatchToTodolistsReducer] = useReducer(todolistsReducer, [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]);

    function removeTask(id: string, todolistId: string): void {
        const action = removeTaskAC(todolistId, id);
        dispatchToTasksReducer(action);

    }

    function addTask(title: string, todolistId: string): void {
        const action = addTaskAC(title, todolistId);
        dispatchToTasksReducer(action);

    }

    const toggleTaskStatus = (taskId: string, isDone: boolean, todolistId: string): void => {
        const action = changeTaskStatusAC(taskId, isDone, todolistId);
        dispatchToTasksReducer(action);

    };

    function ChangeTaskTitle(taskId: string, newTitle: string, todolistId: string): void {
        const action = changeTaskTitleAC(taskId, newTitle, todolistId);
        dispatchToTasksReducer(action);

    }


    const onAllClickHundler = (todolistId: string): void => {

        setTasks(prevState => ({
            ...prevState,
            [todoListId]: [],
        }));
    };

    function changeFilter(value: FilterValueType, todolistId: string): void {
        setTodoLists(todolistId.map(tl =>
            tl.id === todolistId ? {...tl, filter: value} : tl
        ));
    }

    function removeTodoList(todolistId: string) {
        const action = removeTodolistAC(todolistId)
        dispatchToTodolistsReducer(action)
        dispatchToTasksReducer(action);
    }

    function addTodoList(title: string) {
        let todolist: TodoListsPropsType = {
            id: v1(),
            title: title,
            filter: "all"
        }
        setTodoLists([todolist, ...todoLists])
        setTasks({...tasks, [todolist.id]: []})
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
                        let tasksForTodoList = tasks[tl.id];
                        if (tl.filter === 'completed') {
                            tasksForTodoList = tasks[tl.id].filter(t => t.isDone);
                        }
                        if (tl.filter === 'active') {
                            tasksForTodoList = tasks[tl.id].filter(t => !t.isDone);
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
                                        removeTodoList={removeTodoList}
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

export default AppWithReducers;

