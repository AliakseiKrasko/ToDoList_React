import React, {useCallback} from 'react';
import {FilterValueType} from './AppWithRedux';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, IconButton} from '@mui/material';
import {Delete} from '@mui/icons-material';
import {Task} from './Task';


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
    changeTaskStatus: (id: string, isDone: boolean, todoListId: string) => void;
    filter: FilterValueType;
    removeTodoList: (todoListId: string) => void
    changeTaskTitle: (id: string, newTitle: string, todoListId: string) => void;
    changeTodoListTitle: (id: string, newTitle: string) => void
};

export const TodoList = React.memo(function (props: PropsType) {

    const onActiveClickHandler = useCallback(() => props.changeFilter('active', props.id), [props.changeFilter, props.id]);
    const onCompletedClickHandler = useCallback(() => props.changeFilter('completed', props.id), [props.changeFilter, props.id]);
    const removeTodoListHandler = useCallback(() => props.removeTodoList(props.id), [props.removeTodoList, props.id]);

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id);
    }, [props.addTask, props.id]);

    const changeTodoLiistTitle = useCallback((newTitle: string) => {
        props.changeTodoListTitle(props.id, newTitle)
    }, [props.changeTodoListTitle, props.id]);

    let tasksForTodoList = props.tasks

    if (props.filter === 'completed') {
        tasksForTodoList = props.tasks.filter(t => t.isDone);
    }
    if (props.filter === 'active') {
        tasksForTodoList = props.tasks.filter(t => !t.isDone);
    }

    return (
        <div>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <h3>
                    <EditableSpan title={props.title} onChange={changeTodoLiistTitle}/>
                </h3>
                <IconButton onClick={removeTodoListHandler}>
                    <Delete/>
                </IconButton>

            </div>

            <AddItemForm addItem={addTask}/>


            <div>
                {tasksForTodoList.length === 0 ? (
                    <p style={{textAlign: 'center', color: '#999'}}>No tasks</p>
                ) : (
                    tasksForTodoList.map(task => <Task
                        key={task.id}
                        task={task}
                        changeTaskStatus={props.changeTaskStatus}
                        changeTaskTitle={props.changeTaskTitle}
                        removeTask={props.removeTask}
                        todolistId={props.id}
                    />)
                )}
            </div>
            <div>
                <Button
                    color={'inherit'}
                    variant={props.filter === 'all' ? 'contained' : 'text'}
                    onClick={() => props.changeFilter('all', props.id)}
                >
                    All
                </Button>
                <Button
                    color={'primary'}
                    variant={props.filter === 'active' ? 'contained' : 'text'}
                    onClick={onActiveClickHandler}
                >
                    Active
                </Button>
                <Button
                    color={'secondary'}
                    variant={props.filter === 'completed' ? 'contained' : 'text'}
                    onClick={onCompletedClickHandler}
                >
                    Completed
                </Button>
                {/*<Button*/}
                {/*    color={'success'}*/}
                {/*    variant={props.filter === 'firstThree' ? 'contained' : 'text'}*/}
                {/*    onClick={onFirstThreeClickHandler}*/}
                {/*>*/}
                {/*    First Three*/}
                {/*</Button>*/}
            </div>
        </div>
    );
});

