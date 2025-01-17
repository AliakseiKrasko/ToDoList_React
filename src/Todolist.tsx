import {ChangeEvent} from "react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from "@mui/material/Button";
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Box from "@mui/material/Box";
import {filterButtonsContainerSx, getListItemSx} from "./Todolist.styles";
import {TodolistTitle} from './TodolistTitle'
import {TaskType} from './model/task-reducer';
import {FilterValuesType, TodolistType} from './model/todolists-reducer';
import {FilterButtons} from './FilterButtons';

type PropsType = {
    todolist: TodolistType
    tasks: TaskType[]
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (filter: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, taskStatus: boolean, todolistId: string) => void
    updateTask: (todolistId: string, taskId: string, title: string) => void
}

export const Todolist = (props: PropsType) => {
    const {
        todolist,
        tasks,
        removeTask,
        changeFilter,
        addTask,
        changeTaskStatus,
        updateTask,
    } = props


    const addTaskCallback = (title: string) => {
        addTask(title, todolist.id)
    }

    return (
        <div>
            <TodolistTitle todolist={todolist}/>
            <AddItemForm addItem={addTaskCallback}/>
            {
                tasks.length === 0
                    ? <p>Тасок нет</p>
                    : <List>
                        {tasks.map((task) => {
                            const removeTaskHandler = () => {
                                removeTask(task.id, todolist.id)
                            }

                            const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                const newStatusValue = e.currentTarget.checked
                                changeTaskStatus(task.id, newStatusValue, todolist.id)
                            }

                            const changeTaskTitleHandler = (title: string) => {
                                updateTask(todolist.id, task.id, title)
                            }

                            return <ListItem key={task.id} sx={getListItemSx(task.isDone)}>
                                <div>
                                    <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler}/>
                                    <EditableSpan value={task.title} onChange={changeTaskTitleHandler}/>
                                </div>
                                <IconButton onClick={removeTaskHandler}>
                                    <DeleteIcon/>
                                </IconButton>
                            </ListItem>
                        })}
                    </List>
            }
            <FilterButtons todolist={todolist} changeFilter={changeFilter}/>
        </div>
    )
}