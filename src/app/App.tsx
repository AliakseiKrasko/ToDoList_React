import './App.css';
import CssBaseline from '@mui/material/CssBaseline';
import {ThemeProvider} from '@mui/material/styles';
import {getTheme} from '../common/theme/theme'
import {Header} from '../Header'
import {Main} from '../Main'
import {selectThemeMode} from './app-selector'
import {useAppSelector} from './hook'
import {TasksType} from '../TodoList';

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

    const themeMode = useAppSelector(selectThemeMode)

    const theme = getTheme(themeMode)


    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Header/>
            <Main/>
        </ThemeProvider>
    )
        ;
}

export default App;

