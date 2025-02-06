import React, { ChangeEvent } from "react"
import { Checkbox, IconButton } from "@mui/material"
import { changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from "../../../../../model/task-reducer"
import ListItem from "@mui/material/ListItem"
import DeleteIcon from "@mui/icons-material/Delete"
import { getListItemSx } from "./Task.styles"
import { EditableSpan } from "common/components/EditableSpan"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { DomianTask } from "../../../../../api/tasksApi.types"
import { TaskStatus } from "../../../../../lib/enams"

type PropsType = {
  task: DomianTask
  todolistId: string
}
export const Task = ({ task, todolistId }: PropsType) => {
  const dispatch = useAppDispatch()
  const removeTaskHandler = () => {
    dispatch(removeTaskAC({ taskId: task.id, todolistId }))
  }

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const newStatusValue = e.currentTarget.checked
    dispatch(changeTaskStatusAC({ taskId: task.id, isDone: newStatusValue, todolistId }))
  }

  const changeTaskTitleHandler = (title: string) => {
    dispatch(changeTaskTitleAC({ todolistId, taskId: task.id, title }))
  }

  return (
    <ListItem sx={getListItemSx(task.status === TaskStatus.Completed)}>
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
