import React, {useCallback} from 'react';
import {Container, Grid2, Paper} from '@mui/material';
import {AddItemForm} from './AddItemForm';
import {TodoList} from './TodoList';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistsAC
} from './model/todolists-reducer.tx';
import {useAppDispatch, useAppSelector} from './app/hook';
import {selectTodolists} from './model/todolists-selectors';
import {selectTask} from './model/tasks-selectors';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './model/task-reducer';
import {FilterValueType} from './app/App';

const Todolists = () => {

    const dispatch = useAppDispatch()

    const todolists = useAppSelector(selectTodolists)
    const tasks = useAppSelector(selectTask)

    const addTodoList = useCallback((title: string) => {
        const action = addTodolistAC(title)
        dispatch(action)
    }, [dispatch]);
    const removeTask = useCallback(function (id: string, todolistId: string): void {
        const action = removeTaskAC({todolistId, id});
        dispatch(action);

    }, [dispatch]);

    const addTask = useCallback(function (title: string, todolistId: string): void {
        dispatch(addTaskAC({title, todolistId}));

    }, [dispatch]);

    const changeTaskStatus = useCallback(function (id: string, isDone: boolean, todolistId: string): void {
        const action = changeTaskStatusAC({id, isDone, todolistId});
        dispatch(action);

    }, [dispatch]);

    const ChangeTaskTitle = useCallback(function (id: string, newTitle: string, todolistId: string): void {
        const action = changeTaskTitleAC({id, newTitle, todolistId});
        dispatch(action);

    }, [dispatch]);

    const changeFilter = useCallback(function (value: FilterValueType, todolistId: string): void {
        dispatch(changeTodolistFilterAC(value, todolistId));
    }, [dispatch]);

    const removeTodoList = useCallback(function (todolistId: string) {
        dispatch(removeTodolistsAC(todolistId))

    }, [dispatch]);
    const changeTodoLiistTitle = function (id: string, newTitle: string) {
        dispatch(changeTodolistTitleAC(id, newTitle))

    }

    return (
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
    );
};

export default Header;