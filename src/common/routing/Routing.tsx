import { Route, Routes } from "react-router"
import { Login } from "../../features/auth/ui/Login/Login"
import { Main } from "../../app/Main"
import { Page404 } from "common/components/Page404"

export const Path = {
  Main: "/",
  Login: "login",
  NotFound: "*",
  Home: "ToDoList_React",
} as const

export const Routing = () => {
  return (
    <Routes>
      <Route path={Path.Main} element={<Main />} />
      <Route path={Path.Login} element={<Login />} />
      <Route path={Path.NotFound} element={<Page404 />} />
      <Route path={Path.Home} element={<Main />} />
    </Routes>
  )
}
