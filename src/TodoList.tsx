import React, {ChangeEvent} from 'react';
import {FilterValueType} from './App';
// import {Button} from './Button';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, Checkbox, IconButton} from '@mui/material';
import {Delete} from '@mui/icons-material';

export type TasksType = {
    id: string;
    title: string;
    isDone: boolean;
};

type PropsType = {
    id: string;
    title: string;
    tasks: Array<TasksType>;
    removeTask: (id: string, todoListId: string) => void;
    changeFilter: (value: FilterValueType, todoListId: string) => void;
    addTask: (title: string, todoListId: string) => void;
    toggleTaskStatus: (id: string, isDone: boolean, todoListId: string) => void;
    onAllClickHundler: (todoListId: string) => void;
    filter: FilterValueType;
    onDeletTodoList: (todoListId: string) => void
    ChangeTaskTitle: (id: string, newTitle: string, todoListId: string) => void;
    changeTodoLiistTitle: (id: string, newTitle: string) => void
};

export function TodoList(props: PropsType) {

    const onAllClickHandler = () => props.onAllClickHundler(props.id);
    const onActiveClickHandler = () => props.changeFilter('active', props.id);
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id);
    // const onFirstThreeClickHandler = () => props.changeFilter('firstThree', props.id);
    const onDeletTodoListHandler = () => props.onDeletTodoList(props.id)

    const addTask = (title: string) => {
        props.addTask(title, props.id);
    }

    const changeTodoLiistTitle = (newTitle: string) => {
        props.changeTodoLiistTitle(props.id, newTitle)
    }

    return (
        <div>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <h3>
                    <EditableSpan title={props.title} onChange={changeTodoLiistTitle} />
                </h3>
                <IconButton onClick={onDeletTodoListHandler} >
                    <Delete />
                </IconButton>

            </div>

            <AddItemForm addItem={addTask} />
            <button onClick={onAllClickHandler}>Delete All Tasks</button>
            <ul>
                {props.tasks.map(task => {
                    const onRemoveHandler = () => props.removeTask(task.id, props.id);
                    const onToggleTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
                        props.toggleTaskStatus(task.id, e.currentTarget.checked, props.id);
                    };
                    const onChangeTitle = (newTitle: string) => {
                        props.ChangeTaskTitle(task.id, newTitle, props.id);
                    }

                    return (
                        <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                            <Checkbox checked={task.isDone} onChange={onToggleTaskStatus} color={'secondary'}/>

                            <EditableSpan title={task.title} onChange={onChangeTitle}/>
                            <IconButton onClick={onRemoveHandler} size={'small'}>
                                <Delete />
                            </IconButton>

                        </li>
                    );
                })}
            </ul>
            <div>
                <Button
                    color={'inherit'}
                    variant={props.filter === 'all' ? 'contained' : 'text'}
                    onClick={() => props.changeFilter('all', props.id)}
                >
                    All
                </Button>
                <Button
                    color={'primary'}
                    variant={props.filter === 'active' ? 'contained' : 'text'}
                    onClick={onActiveClickHandler}
                >
                    Active
                </Button>
                <Button
                    color={'secondary'}
                    variant={props.filter === 'completed' ? 'contained' : 'text'}
                    onClick={onCompletedClickHandler}
                >
                    Completed
                </Button>
                {/*<Button*/}
                {/*    color={'success'}*/}
                {/*    variant={props.filter === 'firstThree' ? 'contained' : 'text'}*/}
                {/*    onClick={onFirstThreeClickHandler}*/}
                {/*>*/}
                {/*    First Three*/}
                {/*</Button>*/}
            </div>
        </div>
    );
}

