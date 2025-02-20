import { Route, Routes } from "react-router"
import { Login } from "../../features/auth/ui/Login/Login"
import { Main } from "../../app/Main"

export const Path = {
  Main: "/",
  Login: "login",
} as const

export const Routing = () => {
  return (
    <Routes>
      <Route path={Path.Main} element={<Main />} />
      <Route path={Path.Login} element={<Login />} />
    </Routes>
  )
}
