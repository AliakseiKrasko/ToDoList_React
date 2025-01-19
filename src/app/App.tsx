import CssBaseline from '@mui/material/CssBaseline';
import {ThemeProvider} from '@mui/material/styles';
import {getTheme} from '../common/theme/theme'
import {Header} from '../common/Header/Header'
import {Main} from './Main'
import {selectThemeMode} from './app-selector'
import {useAppSelector} from './hook'


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

