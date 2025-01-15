import React from 'react';
import './App.css';
import {TasksType} from '../TodoList';
import Header from '../Header';
import Main from '../Main';

export type FilterValueType = 'all' | 'active' | 'completed';

export type TodoListsPropsType = {
    id: string;
    title: string;
    filter: FilterValueType;
};

export type TasksStateType = {
    [key: string]: Array<TasksType>;
}


function App() {

    return (
        <div>
            <Header/>
            <Main/>

        </div>
    )
        ;
}

export default App;

