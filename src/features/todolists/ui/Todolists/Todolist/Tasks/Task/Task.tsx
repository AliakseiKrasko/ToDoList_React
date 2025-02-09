import React, { ChangeEvent } from "react"
import { Checkbox, IconButton } from "@mui/material"
import { removeTaskTC, updateTaskTC } from "../../../../../model/task-reducer"
import ListItem from "@mui/material/ListItem"
import DeleteIcon from "@mui/icons-material/Delete"
import { getListItemSx } from "./Task.styles"
import { EditableSpan } from "common/components/EditableSpan"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { DomainTask } from "../../../../../api/tasksApi.types"
import { TaskStatus } from "../../../../../lib/enams"
import { DomainTodolist } from "../../../../../model/todolists-reducer"

type Props = {
  task: DomainTask
  todolist: DomainTodolist
}

export const Task = ({ task, todolist }: Props) => {
  const dispatch = useAppDispatch()

  const removeTaskHandler = () => {
    dispatch(removeTaskTC({ taskId: task.id, todolistId: todolist.id }))
  }

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
    dispatch(
      updateTaskTC({
        taskId: task.id,
        todolistId: task.todoListId,
        domainModel: { status },
      }),
    )
  }

  const changeTaskTitleHandler = (title: string) => {
    dispatch(
      updateTaskTC({
        taskId: task.id,
        todolistId: task.todoListId,
        domainModel: { title },
      }),
    )
  }

  return (
    <ListItem key={task.id} sx={getListItemSx(task.status === TaskStatus.Completed)}>
      <div>
        <Checkbox checked={task.status === TaskStatus.Completed} onChange={changeTaskStatusHandler} />
        <EditableSpan value={task.title} onChange={changeTaskTitleHandler} />
      </div>
      <IconButton onClick={removeTaskHandler}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  )
}
