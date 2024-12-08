import React, {ChangeEvent} from 'react';
import {FilterValueType} from './App';
import {Button} from './Button';
import {AddItemForm} from './AddItemForm';

export type TasksType = {
    id: string;
    title: string;
    isDone: boolean;
};

type PropsType = {
    id: string;
    title: string;
    tasks: Array<TasksType>;
    removeTask: (id: string, todoListId: string) => void;
    changeFilter: (value: FilterValueType, todoListId: string) => void;
    addTask: (title: string, todoListId: string) => void;
    toggleTaskStatus: (id: string, isDone: boolean, todoListId: string) => void;
    onAllClickHundler: (todoListId: string) => void;
    filter: FilterValueType;
    onDeletTodoList: (todoListId: string) => void
};

export function TodoList(props: PropsType) {

    const onAllClickHandler = () => props.onAllClickHundler(props.id);
    const onActiveClickHandler = () => props.changeFilter('active', props.id);
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id);
    const onFirstThreeClickHandler = () => props.changeFilter('firstThree', props.id);
    const onDeletTodoListHandler = () => props.onDeletTodoList(props.id)

    const addTask = (title: string) => {
        props.addTask(title, props.id);
    }

    return (
        <div>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <h3>{props.title}</h3>
                <Button title={"X"} onClick={onDeletTodoListHandler}/>
            </div>

            <AddItemForm addItem={addTask} />
            <button onClick={onAllClickHandler}>Delete All Tasks</button>
            <ul>
                {props.tasks.map(task => {
                    const onRemoveHandler = () => props.removeTask(task.id, props.id);
                    const onToggleTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
                        props.toggleTaskStatus(task.id, e.currentTarget.checked, props.id);
                    };

                    return (
                        <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                            <input type="checkbox" checked={task.isDone} onChange={onToggleTaskStatus}/>

                            <EditableSpan title={task.title}/>
                            <button onClick={onRemoveHandler}>X</button>
                        </li>
                    );
                })}
            </ul>
            <div>
                <button
                    className={props.filter === 'all' ? 'filter-button' : ''}
                    onClick={() => props.changeFilter('all', props.id)}
                >
                    All
                </button>
                <button
                    className={props.filter === 'active' ? 'filter-button' : ''}
                    onClick={onActiveClickHandler}
                >
                    Active
                </button>
                <button
                    className={props.filter === 'completed' ? 'filter-button' : ''}
                    onClick={onCompletedClickHandler}
                >
                    Completed
                </button>
                <button
                    className={props.filter === 'firstThree' ? 'filter-button' : ''}
                    onClick={onFirstThreeClickHandler}
                >
                    First Three
                </button>
            </div>
        </div>
    );
}

type EditableSpanPropsType = {
    title: string;
}

function EditableSpan (props: EditableSpanPropsType) {
    return <span>{props.title}</span>
}