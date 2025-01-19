import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'
import type {TodolistType} from '../../../../model/todolists-reducer'
import {useAppDispatch} from '../../../../../../app/hook'
import {EditableSpan} from '../../../../../../common/components/EditableSpan/EditableSpan'
import {changeTodolistTitleAC, removeTodolistAC} from '../../../../model/todolists-reducer'
import styles from './TodolistTitle.module.css'

type Props = {
    todolist: TodolistType
}

export const TodolistTitle = ({todolist}: Props) => {
    const dispatch = useAppDispatch()

    const removeTodolist = () => {
        dispatch(removeTodolistAC(todolist.id))
    }

    const updateTodolist = (title: string) => {
        dispatch(changeTodolistTitleAC({id: todolist.id, title}))
    }

    return (
        <div className={styles.container}>
            <h3><EditableSpan value={todolist.title} onChange={updateTodolist}/></h3>
            <IconButton onClick={removeTodolist}>
                <DeleteIcon/>
            </IconButton>
        </div>
    )
}