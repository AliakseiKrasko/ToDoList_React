import Paper from "@mui/material/Paper"
import Grid2 from "@mui/material/Grid2"
import { selectTodolists } from "../../model/todolists-selectors"
import { Todolist } from "./Todolist/Todolist"
import { useAppSelector } from "common/hooks/useAppSelector"
import { useEffect } from "react"
import { fetchTodolistsTC } from "../../model/todolistsSlice"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { useGetTodolistsQuery } from "../../api/todolistsApi"

export const Todolists = () => {
  const data = useGetTodolistsQuery()
  console.log(data)

  return (
    <>
      {data.data?.map((tl: any) => {
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
