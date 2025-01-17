import {AddItemForm} from "./AddItemForm";
import {TodolistTitle} from './TodolistTitle'
import {FilterValuesType, TodolistType} from './model/todolists-reducer';
import {FilterButtons} from './FilterButtons';
import {Tasks} from './Tasks';

type PropsType = {
    todolist: TodolistType
    addTask: (title: string, todolistId: string) => void
}

export const Todolist = (props: PropsType) => {
    const {
        todolist,
        addTask,
    } = props


    const addTaskCallback = (title: string) => {
        addTask(title, todolist.id)
    }

    return (
        <div>
            <TodolistTitle todolist={todolist}/>
            <AddItemForm addItem={addTaskCallback}/>
            <Tasks todolist={todolist}/>
            <FilterButtons todolist={todolist}/>
        </div>
    )
}