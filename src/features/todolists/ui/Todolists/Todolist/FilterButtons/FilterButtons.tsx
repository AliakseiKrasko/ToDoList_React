import React from "react"
import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import { changeTodolistFilter, DomainTodolist, FilterValuesType } from "../../../../model/todolistsSlice"
import { filterButtonsContainerSx } from "./FilterButtons.styles"
import { useAppDispatch } from "common/hooks/useAppDispatch"

type FilterButtonsType = {
  todolist: DomainTodolist
}

export const FilterButtons = ({ todolist }: FilterButtonsType) => {
  const dispatch = useAppDispatch()
  const changeFilter = (filter: FilterValuesType) => {
    dispatch(changeTodolistFilter({ id: todolist.id, filter }))
  }

  return (
    <Box sx={filterButtonsContainerSx}>
      <Button
        variant={todolist.filter === "all" ? "outlined" : "text"}
        color={"inherit"}
        onClick={() => changeFilter("all")}
      >
        All
      </Button>
      <Button
        variant={todolist.filter === "active" ? "outlined" : "text"}
        color={"primary"}
        onClick={() => changeFilter("active")}
      >
        Active
      </Button>
      <Button
        variant={todolist.filter === "completed" ? "outlined" : "text"}
        color={"secondary"}
        onClick={() => changeFilter("completed")}
      >
        Completed
      </Button>
    </Box>
  )
}
