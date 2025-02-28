import DeleteIcon from "@mui/icons-material/Delete"
import IconButton from "@mui/material/IconButton"
import { DomainTodolist, removeTodolistTC, updateTodolistTitleTC } from "../../../../model/todolistsSlice"
import { EditableSpan } from "common/components/EditableSpan"
import { changeTodolistTitleAC, removeTodolistAC } from "../../../../model/todolistsSlice"
import styles from "./TodolistTitle.module.css"
import { useAppDispatch } from "common/hooks/useAppDispatch"

type Props = {
  todolist: DomainTodolist
}

export const TodolistTitle = ({ todolist }: Props) => {
  const dispatch = useAppDispatch()

  const removeTodolist = () => {
    dispatch(removeTodolistTC(todolist.id))
  }

  const updateTodolist = (title: string) => {
    dispatch(updateTodolistTitleTC({ id: todolist.id, title }))
  }

  return (
    <div className={styles.container}>
      <h3>
        <EditableSpan value={todolist.title} onChange={updateTodolist} disabled={todolist.entityStatus === "loading"} />
      </h3>
      <IconButton onClick={removeTodolist} disabled={todolist.entityStatus === "loading"}>
        <DeleteIcon />
      </IconButton>
    </div>
  )
}
