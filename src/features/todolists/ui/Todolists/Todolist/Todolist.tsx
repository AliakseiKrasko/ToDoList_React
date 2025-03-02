import { AddItemForm } from "../../../../../common/components/AddItemForm/AddItemForm"
import { TodolistTitle } from "./TodolistTitle/TodolistTitle"
import { DomainTodolist } from "../../../model/todolistsSlice"
import { FilterButtons } from "./FilterButtons/FilterButtons"
import { Tasks } from "./Tasks/Tasks"
import { addTaskAC, addTaskTC } from "../../../model/taskSlice"
import { useAppDispatch } from "common/hooks/useAppDispatch"

type PropsType = {
  todolist: DomainTodolist
}

export const Todolist = (props: PropsType) => {
  const dispatch = useAppDispatch()
  const { todolist } = props

  const addTask = (title: string) => {
    dispatch(addTaskTC({ title, todolistId: todolist.id }))
  }

  return (
    <div>
      <TodolistTitle todolist={todolist} />
      <AddItemForm addItem={addTask} disabled={todolist.entityStatus === "loading"} />
      <Tasks todolist={todolist} />
      <FilterButtons todolist={todolist} />
    </div>
  )
}
