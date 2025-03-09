import Container from "@mui/material/Container"
import Grid2 from "@mui/material/Grid2"
import { AddItemForm } from "common/components/AddItemForm/AddItemForm"
import { Todolists } from "../features/todolists/ui/Todolists/Todolists"
import { useAddTodolistMutation } from "../features/todolists/api/todolistsApi"
import { useAppSelector } from "common/hooks/useAppSelector"
import { selectIsLoggedIn } from "../features/auth/model/authSlice"
import { Navigate } from "react-router"
import { Path } from "common/routing/Routing"

export const Main = () => {
  const [addTodolist] = useAddTodolistMutation()

  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  const addTodolistCallback = (title: string) => {
    addTodolist(title)
  }

  if (!isLoggedIn) {
    return <Navigate to={Path.Login} />
  }

  return (
    <Container fixed>
      <Grid2 container sx={{ mb: "30px" }}>
        <AddItemForm addItem={addTodolistCallback} />
      </Grid2>
      <Grid2 container spacing={4}>
        <Todolists />
      </Grid2>
    </Container>
  )
}
