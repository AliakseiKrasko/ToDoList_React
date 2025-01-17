import MenuIcon from '@mui/icons-material/Menu'
import AppBar from '@mui/material/AppBar'
import IconButton from '@mui/material/IconButton'
import Switch from '@mui/material/Switch'
import Toolbar from '@mui/material/Toolbar'
import {changeThemeAC} from './app/app-reducer'
import {selectThemeMode} from './app/app-selector'
import {useAppDispatch, useAppSelector} from './app/hook'
import {getTheme} from './common/theme/theme'
import {MenuButton} from './MenuButton'

export const Header = () => {
    const themeMode = useAppSelector(selectThemeMode)

    const dispatch = useAppDispatch()

    const theme = getTheme(themeMode)

    const changeModeHandler = () => {
        dispatch(changeThemeAC(themeMode === "light" ? "dark" : 'light'))
    }

    return (
        <AppBar position="static" sx={{mb: '30px'}}>
            <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
                <IconButton color="inherit">
                    <MenuIcon/>
                </IconButton>
                <div>
                    <MenuButton>Login</MenuButton>
                    <MenuButton>Logout</MenuButton>
                    <MenuButton background={theme.palette.primary.dark}>Faq</MenuButton>
                    <Switch color={'default'} onChange={changeModeHandler}/>
                </div>
            </Toolbar>
        </AppBar>
    )
}