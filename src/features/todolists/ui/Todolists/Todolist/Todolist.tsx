import { AddItemForm } from "../../../../../common/components/AddItemForm/AddItemForm"
import { TodolistTitle } from "./TodolistTitle/TodolistTitle"
import { TodolistType } from "../../../model/todolists-reducer"
import { FilterButtons } from "./FilterButtons/FilterButtons"
import { Tasks } from "./Tasks/Tasks"
import { addTaskAC } from "../../../model/task-reducer"
import { useAppDispatch } from "../../../../../app/hook"

type PropsType = {
  todolist: TodolistType
}

export const Todolist = (props: PropsType) => {
  const dispatch = useAppDispatch()
  const { todolist } = props

  const addTask = (title: string) => {
    dispatch(addTaskAC({ title, todolistId: todolist.id }))
  }

  return (
    <div>
      <TodolistTitle todolist={todolist} />
      <AddItemForm addItem={addTask} />
      <Tasks todolist={todolist} />
      <FilterButtons todolist={todolist} />
    </div>
  )
}
