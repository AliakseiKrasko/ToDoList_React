import React from "react"
import { changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from "../../../../model/task-reducer"
import { TodolistType } from "../../../../model/todolists-reducer"
import List from "@mui/material/List"
import { selectTasks } from "../../../../model/tasks-selectors"
import { Task } from "./Task/Task"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { useAppSelector } from "common/hooks/useAppSelector"

type PropsType = {
  todolist: TodolistType
}
export const Tasks = ({ todolist }: PropsType) => {
  const dispatch = useAppDispatch()
  const tasks = useAppSelector(selectTasks)
  const allTodolistTasks = tasks[todolist.id]
  let tasksForTodolist = allTodolistTasks
  if (todolist.filter === "active") {
    tasksForTodolist = allTodolistTasks.filter((task) => !task.isDone)
  }
  if (todolist.filter === "completed") {
    tasksForTodolist = allTodolistTasks.filter((task) => task.isDone)
  }

  const removeTask = (taskId: string, todolistId: string) => {
    dispatch(removeTaskAC({ taskId, todolistId }))
  }
  const changeTaskStatus = (taskId: string, taskStatus: boolean, todolistId: string) => {
    dispatch(changeTaskStatusAC({ taskId, isDone: taskStatus, todolistId }))
  }
  const updateTask = (todolistId: string, taskId: string, title: string) => {
    dispatch(changeTaskTitleAC({ taskId, title, todolistId }))
  }

  return (
    <>
      {tasksForTodolist.length === 0 ? (
        <p>No tasks</p>
      ) : (
        <List>
          {tasksForTodolist.map((task) => {
            return <Task key={task.id} task={task} todolistId={todolist.id} />
          })}
        </List>
      )}
    </>
  )
}
