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
import { DomainTodolist } from "../../../../../model/todolistsSlice"

type Props = {
  task: DomainTask
  todolist: DomainTodolist
  disabled?: boolean
}

export const Task = ({ task, todolist, disabled }: Props) => {
  const dispatch = useAppDispatch()

  const isDisabled = disabled ?? false

  const removeTaskHandler = () => {
    if (!isDisabled) {
      dispatch(removeTaskTC({ taskId: task.id, todolistId: todolist.id }))
    }
  }

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (!isDisabled) {
      const status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
      dispatch(
        updateTaskTC({
          taskId: task.id,
          todolistId: task.todoListId,
          domainModel: { status },
        }),
      )
    }
  }

  const changeTaskTitleHandler = (title: string) => {
    if (!isDisabled) {
      dispatch(
        updateTaskTC({
          taskId: task.id,
          todolistId: task.todoListId,
          domainModel: { title },
        }),
      )
    }
  }

  return (
    <ListItem key={task.id} sx={getListItemSx(task.status === TaskStatus.Completed)}>
      <div>
        <Checkbox
          checked={task.status === TaskStatus.Completed}
          onChange={changeTaskStatusHandler}
          disabled={isDisabled}
        />
        <EditableSpan value={task.title} onChange={changeTaskTitleHandler} disabled={isDisabled} />
      </div>
      <IconButton onClick={removeTaskHandler} disabled={isDisabled}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  )
}
