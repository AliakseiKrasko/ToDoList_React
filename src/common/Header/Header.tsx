import MenuIcon from "@mui/icons-material/Menu"
import AppBar from "@mui/material/AppBar"
import IconButton from "@mui/material/IconButton"
import Switch from "@mui/material/Switch"
import Toolbar from "@mui/material/Toolbar"
import { getTheme } from "../theme/theme"
import { MenuButton } from "../Button/MenuButton"
import { useAppSelector } from "common/hooks/useAppSelector"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { LinearProgress } from "@mui/material"

import { Path } from "common/routing/Routing"
import { useNavigate } from "react-router"
import { useEffect } from "react"
import { changeTheme, logoutTC, selectAppStatus, selectIsLoggedIn, selectThemeMode } from "../../app/appSlice"

export const Header = () => {
  const dispatch = useAppDispatch()

  const themeMode = useAppSelector(selectThemeMode)
  const status = useAppSelector(selectAppStatus)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  const theme = getTheme(themeMode)

  const navigate = useNavigate()

  const changeModeHandler = () => {
    dispatch(changeTheme({ themeMode: themeMode === "light" ? "dark" : "light" }))
  }

  useEffect(() => {
    if (!isLoggedIn) {
      navigate(Path.Login)
    }
  }, [isLoggedIn])

  const logoutHandler = () => {
    dispatch(logoutTC())
  }

  return (
    <AppBar position="static" sx={{ mb: "30px" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <IconButton color="inherit">
          <MenuIcon />
        </IconButton>
        <div>
          {isLoggedIn && <MenuButton onClick={logoutHandler}>Logout</MenuButton>}
          <MenuButton background={theme.palette.primary.dark}>Faq</MenuButton>
          <Switch color={"default"} onChange={changeModeHandler} />
        </div>
      </Toolbar>
      {status === "loading" && <LinearProgress />}
    </AppBar>
  )
}
