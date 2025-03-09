import DeleteIcon from "@mui/icons-material/Delete"
import IconButton from "@mui/material/IconButton"
import { DomainTodolist } from "../../../../model/todolistsSlice"
import { EditableSpan } from "common/components/EditableSpan"
import styles from "./TodolistTitle.module.css"
import { useRemoveTodolistMutation, useUpdateTodolistTitleMutation } from "../../../../api/todolistsApi"

type Props = {
  todolist: DomainTodolist
}

export const TodolistTitle = ({ todolist }: Props) => {
  const [removeTodolist] = useRemoveTodolistMutation()
  const [updateTodolistTitle] = useUpdateTodolistTitleMutation()

  const removeTodolistHandler = () => {
    removeTodolist(todolist.id)
  }

  const updateTodolist = (id: string, title: string) => {
    updateTodolistTitle({ id, title })
  }

  return (
    <div className={styles.container}>
      <h3>
        <EditableSpan
          value={todolist.title}
          onChange={(newTitle) => updateTodolist(todolist.id, newTitle)}
          disabled={todolist.entityStatus === "loading"}
        />
      </h3>
      <IconButton onClick={removeTodolistHandler} disabled={todolist.entityStatus === "loading"}>
        <DeleteIcon />
      </IconButton>
    </div>
  )
}
