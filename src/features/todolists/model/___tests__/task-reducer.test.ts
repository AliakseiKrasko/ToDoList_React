import { removeTaskAC, tasksReducer, TasksStateType, addTaskAC, updateTaskAC } from "../task-reducer"
import { addTodolistAC, removeTodolistAC } from "../todolists-reducer"
import { TaskPriority, TaskStatus } from "../../lib/enams"

let startState: TasksStateType

beforeEach(() => {
  startState = {
    todolistId1: [
      {
        description: "",
        title: "HTML",
        status: TaskStatus.New,
        priority: TaskPriority.Low,
        startDate: "",
        deadline: "",
        id: "1",
        todoListId: "todolistId1",
        order: 0,
        addedDate: "",
      },
      {
        description: "",
        title: "JS",
        status: TaskStatus.New,
        priority: TaskPriority.Low,
        startDate: "",
        deadline: "",
        id: "2",
        todoListId: "todolistId1",
        order: 0,
        addedDate: "",
      },
    ],
    todolistId2: [
      {
        description: "",
        title: "milk",
        status: TaskStatus.Completed,
        priority: TaskPriority.Low,
        startDate: "",
        deadline: "",
        id: "3",
        todoListId: "todolistId2",
        order: 0,
        addedDate: "",
      },
    ],
  }
})

test("correct task should be deleted from correct array", () => {
  const endState = tasksReducer(startState, removeTaskAC({ taskId: "2", todolistId: "todolistId1" }))

  expect(endState["todolistId1"].length).toBe(1)
  expect(endState["todolistId1"].some((task) => task.id === "2")).toBe(false)
})

test("correct task should be added to correct array", () => {
  const newTask = {
    description: "",
    title: "juice",
    status: TaskStatus.New,
    priority: TaskPriority.Low,
    startDate: "",
    deadline: "",
    id: "4",
    todoListId: "todolistId1",
    order: 0,
    addedDate: "",
  }
  const endState = tasksReducer(startState, addTaskAC({ task: newTask }))

  expect(endState["todolistId1"].length).toBe(3)
  expect(endState["todolistId1"].some((task) => task.title === "juice")).toBe(true)
})

test("status of specified task should be changed", () => {
  const endState = tasksReducer(
    startState,
    updateTaskAC({ task: { ...startState["todolistId1"][1], status: TaskStatus.Completed } }),
  )

  expect(endState["todolistId1"].find((task) => task.id === "2")?.status).toBe(TaskStatus.Completed)
})

test("title of specified task should be changed", () => {
  const endState = tasksReducer(
    startState,
    updateTaskAC({ task: { ...startState["todolistId1"][1], title: "coffee" } }),
  )

  expect(endState["todolistId1"].find((task) => task.id === "2")?.title).toBe("coffee")
})

test("new array should be added when new todolist is added", () => {
  const newTodolist = {
    id: "todolistId3",
    title: "new todolist",
    addedDate: "",
    order: 0,
  }
  const endState = tasksReducer(startState, addTodolistAC(newTodolist))

  expect(Object.keys(endState).length).toBe(3)
  expect(endState["todolistId3"]).toEqual([])
})

test("property with todolistId should be deleted", () => {
  const endState = tasksReducer(startState, removeTodolistAC("todolistId2"))

  expect(Object.keys(endState).length).toBe(1)
  expect(endState["todolistId2"]).toBeUndefined()
})
