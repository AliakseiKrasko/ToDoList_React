import DeleteIcon from "@mui/icons-material/Delete"
import IconButton from "@mui/material/IconButton"
import { DomainTodolist, removeTodolistTC, updateTodolistTitleTC } from "../../../../model/todolistsSlice"
import { EditableSpan } from "common/components/EditableSpan"
import styles from "./TodolistTitle.module.css"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { useRemoveTodolistMutation } from "../../../../api/todolistsApi"

type Props = {
  todolist: DomainTodolist
}

export const TodolistTitle = ({ todolist }: Props) => {
  const [removeTodolist] = useRemoveTodolistMutation()
  const dispatch = useAppDispatch()

  const removeTodolistHandler = () => {
    removeTodolist(todolist.id)
    // dispatch(removeTodolistTC(todolist.id))
  }

  const updateTodolist = (title: string) => {
    dispatch(updateTodolistTitleTC({ id: todolist.id, title }))
  }

  return (
    <div className={styles.container}>
      <h3>
        <EditableSpan value={todolist.title} onChange={updateTodolist} disabled={todolist.entityStatus === "loading"} />
      </h3>
      <IconButton onClick={removeTodolistHandler} disabled={todolist.entityStatus === "loading"}>
        <DeleteIcon />
      </IconButton>
    </div>
  )
}
