import { action } from "@storybook/addon-actions"
import { Task } from "../../../src/features/todolists/ui/Todolists/Todolist/Tasks/Tasks"

export default {
  title: "Task Component",
  component: Task,
}

const changeTaskStatusCallback = action("change task status")
const changeTaskTitleCallback = action("change task title")
const removeTaskCallback = action("remove task")

export const TaskComponentBaseExemple = () => {
  return (
    <>
      <Task
        task={{ id: "1", isDone: true, title: "Task 1" }}
        changeTaskStatus={changeTaskStatusCallback}
        changeTaskTitle={changeTaskTitleCallback}
        removeTask={removeTaskCallback}
        todolistId={"todolistId1"}
      />
      <Task
        task={{ id: "2", isDone: false, title: "Task 2" }}
        changeTaskStatus={changeTaskStatusCallback}
        changeTaskTitle={changeTaskTitleCallback}
        removeTask={removeTaskCallback}
        todolistId={"todolistId2"}
      />
    </>
  )
}
