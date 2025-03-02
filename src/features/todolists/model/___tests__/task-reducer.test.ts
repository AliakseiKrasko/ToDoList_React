import { addTask, removeTask, tasksReducer, TasksStateType, updateTask } from "../taskSlice"
import { TaskPriority, TaskStatus } from "../../lib/enams"
import { addTodolist, removeTodolist } from "../todolistsSlice"

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
  const endState = tasksReducer(startState, removeTask({ taskId: "2", todolistId: "todolistId1" }))

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
  const endState = tasksReducer(startState, addTask({ task: newTask }))

  expect(endState["todolistId1"].length).toBe(3)
  expect(endState["todolistId1"].some((task) => task.title === "juice")).toBe(true)
})

test("status of specified task should be changed", () => {
  const endState = tasksReducer(
    startState,
    updateTask({
      taskId: "2",
      todolistId: "todolistId1",
      domainModel: { status: TaskStatus.Completed },
    }),
  )

  expect(endState["todolistId1"].find((task) => task.id === "2")?.status).toBe(TaskStatus.Completed)
})

test("status of specified task should be changed", () => {
  const endState = tasksReducer(
    startState,
    updateTask({
      taskId: "2",
      todolistId: "todolistId1",
      domainModel: { status: TaskStatus.Completed },
    }),
  )

  expect(endState["todolistId1"].find((task) => task.id === "2")?.status).toBe(TaskStatus.Completed)
})
test("new array should be added when new todolist is added", () => {
  const newTodolist = {
    id: "todolistId3",
    title: "new todolist",
    addedDate: "",
    order: 0,
  }
  const endState = tasksReducer(startState, addTodolist({ todolist: newTodolist }))

  expect(Object.keys(endState).length).toBe(3)
  expect(endState["todolistId3"]).toEqual([])
})

test("property with todolistId should be deleted", () => {
  const endState = tasksReducer(startState, removeTodolist({ id: "todolistId2" }))

  expect(Object.keys(endState).length).toBe(1)
  expect(endState["todolistId2"]).toBeUndefined()
})
