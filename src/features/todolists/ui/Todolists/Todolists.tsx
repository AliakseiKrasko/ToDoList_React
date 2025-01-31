import Paper from "@mui/material/Paper"
import Grid2 from "@mui/material/Grid2"
import { selectTodolists } from "../../model/todolists-selectors"
import { Todolist } from "./Todolist/Todolist"
import { useAppSelector } from "common/hooks/useAppSelector"

export const Todolists = () => {
  const todolists = useAppSelector(selectTodolists)

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
