import React, {ChangeEvent} from 'react';
import {Checkbox, IconButton} from '@mui/material';
import {EditableSpan} from './EditableSpan';
import {Delete} from '@mui/icons-material';
import {TaskType} from './model/task-reducer';

type TaskPropsType = {
    changeTaskStatus: (id: string, isDone: boolean, todoListId: string) => void;
    changeTaskTitle: (id: string, newTitle: string, todoListId: string) => void;
    removeTask: (id: string, todoListId: string) => void;
    task: TaskType;
    todolistId: string
}
export const Task = (props: TaskPropsType) => {
    const onRemoveHandler = () => props.removeTask(props.task.id, props.todolistId);
    const onToggleTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.task.id, e.currentTarget.checked, props.todolistId);
    };
    const onChangeTitle = (newTitle: string) => {
        props.changeTaskTitle(props.task.id, newTitle, props.todolistId);
    };

    return (
        <div className={props.task.isDone ? 'is-done' : ''}>
            <Checkbox checked={props.task.isDone} onChange={onToggleTaskStatus} color={'secondary'}/>
            {/*<EditableSpan title={props.task.title} onChange={onChangeTitle}/>*/}
            <IconButton onClick={onRemoveHandler} size={'small'}>
                <Delete/>
            </IconButton>
        </div>
    )
}