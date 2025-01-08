import React, {useCallback, useReducer} from 'react';
import './App.css';
import {TodoList, TasksType} from './TodoList';
import {AddItemForm} from './AddItemForm';
import {AppBar, Button, Container, Grid2, IconButton, Paper, Toolbar} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'
import {
    changeTodolistFilterAC,
    changeTodolistTitleAC, removeTodolistsAC,
    todolistsReducer
} from './state/todolists-reducer.tx';
import {
    addTaskAC,
    addTodolistAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC, removeTodolistAC,
    tasksReducer

} from './state/task-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from './state/store';

export type FilterValueType = 'all' | 'active' | 'completed';

export type TodoListsPropsType = {
    id: string;
    title: string;
    filter: FilterValueType;
};

export type TasksStateType = {
    [key: string]: Array<TasksType>;
}

function AppWithRedux() {

    const dispatch = useDispatch()

    const todolists = useSelector<RootState, TodoListsPropsType[]>(state => state.todolists)
    const tasks = useSelector<RootState, TasksStateType>(state => state.tasks)


    const removeTask = useCallback( function(id: string, todolistId: string): void {
        const action = removeTaskAC({todolistId, id});
        dispatch(action);

    },[dispatch] );

    const addTask = useCallback (function(title: string, todolistId: string): void {
        dispatch(addTaskAC({title, todolistId}));

    },[dispatch] );

    const changeTaskStatus = useCallback(function(id: string, isDone: boolean, todolistId: string): void  {
        const action = changeTaskStatusAC({id, isDone, todolistId});
        dispatch(action);

    },[dispatch] );

    const ChangeTaskTitle = useCallback (function(id: string, newTitle: string, todolistId: string): void {
        const action = changeTaskTitleAC({id, newTitle, todolistId});
        dispatch(action);

    }, [dispatch] );

    const changeFilter = useCallback (function(value: FilterValueType, todolistId: string): void {
        dispatch(changeTodolistFilterAC(value, todolistId));
    },[dispatch] );

    const removeTodoList = useCallback (function(todolistId: string) {
        dispatch(removeTodolistsAC(todolistId))

    },[dispatch] );

    const addTodoList = useCallback ((title: string) => {
        const action = addTodolistAC(title)
        dispatch(action)
    }, [dispatch]);


    const changeTodoLiistTitle = function (id: string, newTitle: string) {
        dispatch(changeTodolistTitleAC(id, newTitle))

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
                <Grid2 container spacing={3} style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid2>
                <Grid2 container spacing={3}>
                    {todolists.map(tl => {
                        let tasksForTodoList = tasks[tl.id];

                        return (
                            <Grid2 key={tl.id}>
                                <Paper style={{padding: '10px'}}>
                                    <TodoList
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodoList}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeTaskStatus}
                                        removeTodoList={removeTodoList}
                                        filter={tl.filter}
                                        changeTaskTitle={ChangeTaskTitle}
                                        changeTodoListTitle={changeTodoLiistTitle}
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

export default AppWithRedux;

