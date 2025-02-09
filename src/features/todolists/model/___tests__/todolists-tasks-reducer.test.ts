import { TasksStateType } from "../task-reducer"
import { tasksReducer } from "../task-reducer"
import { addTodolistAC, DomainTodolist, todolistsReducer } from "../todolists-reducer"

test("ids should be equals", () => {
  const startTasksState: TasksStateType = {}
  const startTodolistsState: DomainTodolist[] = []

  // ✅ Передаем объект, а не строку
  const action = addTodolistAC({
    id: "todolist-1",
    title: "new todolist",
    addedDate: "2024-02-09",
    order: 0,
  })

  const endTasksState = tasksReducer(startTasksState, action)
  const endTodolistsState = todolistsReducer(startTodolistsState, action)

  const keys = Object.keys(endTasksState)
  const idFromTasks = keys[0]
  const idFromTodolists = endTodolistsState[0].id

  expect(idFromTasks).toBe(action.payload.todolist.id)
  expect(idFromTodolists).toBe(action.payload.todolist.id)
})
