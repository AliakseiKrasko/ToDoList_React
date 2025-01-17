import Paper from '@mui/material/Paper'
import Grid2 from '@mui/material/Grid2'
import type {FilterValuesType} from './model/todolists-reducer'
import {useAppDispatch, useAppSelector} from './app/hook'
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC
} from './model/task-reducer'
import {selectTasks} from './model/tasks-selectors'
import {
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC
} from './model/todolists-reducer'
import {selectTodolists} from './model/todolists-selectors'
import {Todolist} from './Todolist'

export const Todolists = () => {
    const todolists = useAppSelector(selectTodolists)
    const tasks = useAppSelector(selectTasks)

    const dispatch = useAppDispatch()

    const removeTask = (taskId: string, todolistId: string) => {
        dispatch(removeTaskAC({taskId, todolistId}))
    }

    const addTask = (title: string, todolistId: string) => {
        dispatch(addTaskAC({title, todolistId}))
    }

    const changeTaskStatus = (taskId: string, taskStatus: boolean, todolistId: string) => {
        dispatch(changeTaskStatusAC({taskId, isDone: taskStatus, todolistId}))
    }

    const updateTask = (todolistId: string, taskId: string, title: string) => {
        dispatch(changeTaskTitleAC({taskId, title, todolistId}))
    }

    const changeFilter = (filter: FilterValuesType, id: string) => {
        dispatch(changeTodolistFilterAC({id, filter}))
    }

    const removeTodolist = (todolistId: string) => {
        dispatch(removeTodolistAC(todolistId))
    }

    const updateTodolist = (id: string, title: string) => {
        dispatch(changeTodolistTitleAC({id, title}))
    }

    return (
        <>
            {todolists.map((tl) => {
                const allTodolistTasks = tasks[tl.id]
                let tasksForTodolist = allTodolistTasks
                if (tl.filter === 'active') {
                    tasksForTodolist = allTodolistTasks.filter(task => !task.isDone)
                }
                if (tl.filter === 'completed') {
                    tasksForTodolist = allTodolistTasks.filter(task => task.isDone)
                }
                return (
                    <Grid2 key={tl.id}>
                        <Paper sx={{p: '0 20px 20px 20px'}}>
                            <Todolist
                                key={tl.id}
                                todolist={tl}
                                tasks={tasksForTodolist}
                                removeTask={removeTask}
                                changeFilter={changeFilter}
                                addTask={addTask}
                                changeTaskStatus={changeTaskStatus}
                                updateTask={updateTask}
                            />
                        </Paper>
                    </Grid2>
                )
            })}
        </>
    )
}

