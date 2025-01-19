import React, {ChangeEvent} from 'react';
import {Checkbox, IconButton} from '@mui/material';
import {EditableSpan} from '../../../../../../../common/components/EditableSpan/EditableSpan';
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, TaskType} from '../../../../../model/task-reducer';
import ListItem from '@mui/material/ListItem';
import DeleteIcon from '@mui/icons-material/Delete';
import {useAppDispatch} from '../../../../../../../app/hook';
import {getListItemSx} from './Task.styles';

type PropsType = {
    task: TaskType
    todolistId: string
}
export const Task = ({task, todolistId}: PropsType) => {
    const dispatch = useAppDispatch()
    const removeTaskHandler = () => {
        dispatch(removeTaskAC({taskId: task.id, todolistId}))
    }

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const newStatusValue = e.currentTarget.checked
        dispatch(changeTaskStatusAC({taskId: task.id, isDone: newStatusValue, todolistId}))
    }

    const changeTaskTitleHandler = (title: string) => {
        dispatch(changeTaskTitleAC({todolistId, taskId: task.id, title}))
    }

    return (

        <ListItem sx={getListItemSx(task.isDone)}>
            <div>
                <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler}/>
                <EditableSpan value={task.title} onChange={changeTaskTitleHandler}/>
            </div>
            <IconButton onClick={removeTaskHandler}>
                <DeleteIcon/>
            </IconButton>
        </ListItem>


    )
}