import React from 'react';
import './App.css';
import {TasksType} from '../TodoList';
import Header from '../Header';
import Main from '../Main';
import {useTheme} from '@mui/material';
import {useAppSelector} from './hook';
import {selectThemeMode} from './app-selector';
import {getTheme} from '../common/theme/theme';

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

    const themeMode = useAppSelector(selectThemeMode);

    const theme = getTheme(themeMode);
    return (
        <div>
            <Header/>
            <Main/>

        </div>
    )
        ;
}

export default App;

