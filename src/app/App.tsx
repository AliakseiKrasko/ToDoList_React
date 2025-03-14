import CssBaseline from "@mui/material/CssBaseline"
import { ThemeProvider } from "@mui/material/styles"
import { getTheme } from "common/theme/theme"
import { Header } from "common/Header/Header"
import { selectThemeMode } from "./app-selector"
import { useAppSelector } from "common/hooks/useAppSelector"
import { useEffect, useState } from "react"
import { ErrorSnackbar } from "common/components/ErrorSnackbar/ErrorSnackbar"
import { Routing } from "common/routing"
import { CircularProgress } from "@mui/material"
import s from "./App.module.css"
import { useMeQuery } from "../features/auth/api/authApi"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { ResultCode } from "../features/todolists/lib/enams"
import { setAppStatus, setIsLoggedIn } from "./appSlice"

function App() {
  const themeMode = useAppSelector(selectThemeMode)
  // const isInitialized = useAppSelector(selectIsInitialized)
  const [isInitialized, setisInitialized] = useState(false)
  const dispatch = useAppDispatch()

  const { data } = useMeQuery()

  useEffect(() => {
    if (data) {
      if (data?.resultCode === ResultCode.Success) {
        dispatch(setIsLoggedIn({ isLoggedIn: true }))
      }
      setisInitialized(true)
    }
  }, [data])

  if (!isInitialized) {
    return (
      <div className={s.circularProgressContainer}>
        <CircularProgress size={150} thickness={3} />
      </div>
    )
  }

  return (
    <ThemeProvider theme={getTheme(themeMode)}>
      <CssBaseline />
      <Header />
      <Routing />
      <ErrorSnackbar />
    </ThemeProvider>
  )
}

export default App
