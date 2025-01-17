import Paper from '@mui/material/Paper'
import Grid2 from '@mui/material/Grid2'
import {useAppDispatch, useAppSelector} from './app/hook'
import {addTaskAC} from './model/task-reducer'
import {selectTodolists} from './model/todolists-selectors'
import {Todolist} from './Todolist'
import {selectTasks} from './model/tasks-selectors';

export const Todolists = () => {
    const todolists = useAppSelector(selectTodolists)
    const task = useAppSelector(selectTasks)

    const dispatch = useAppDispatch()

    const addTask = (title: string, todolistId: string) => {
        dispatch(addTaskAC({title, todolistId}))
    }

    return (
        <>
            {todolists.map((tl) => {
                return (
                    <Grid2 key={tl.id}>
                        <Paper sx={{p: '0 20px 20px 20px'}}>
                            <Todolist
                                key={tl.id}
                                todolist={tl}
                                addTask={addTask}
                            />
                        </Paper>
                    </Grid2>
                )
            })}
        </>
    )
}

