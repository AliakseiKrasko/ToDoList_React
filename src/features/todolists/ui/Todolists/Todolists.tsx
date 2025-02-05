import Paper from "@mui/material/Paper"
import Grid2 from "@mui/material/Grid2"
import { selectTodolists } from "../../model/todolists-selectors"
import { Todolist } from "./Todolist/Todolist"
import { useAppSelector } from "common/hooks/useAppSelector"
import { useEffect } from "react"
import { todolistsApi } from "../../api/todolistsApi"

export const Todolists = () => {
  const todolists = useAppSelector(selectTodolists)

  useEffect(() => {
    todolistsApi.getTodolists().then((res) => {
      const todolists = res.data
      console.log(todolists)
    })
  }, [])

  return (
    <>
      {todolists.map((tl) => {
        return (
          <Grid2 key={tl.id}>
            <Paper sx={{ p: "0 20px 20px 20px" }}>
              <Todolist todolist={tl} />
            </Paper>
          </Grid2>
        )
      })}
    </>
  )
}
