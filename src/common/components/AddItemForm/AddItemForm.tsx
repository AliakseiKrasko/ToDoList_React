import React, { ChangeEvent, KeyboardEvent, useState } from "react"
import { IconButton, TextField } from "@mui/material"
import { AddCircleOutline } from "@mui/icons-material"
import { RequestStatus } from "../../../app/appSlice"

type AddItemFormPropsType = {
  addItem: (title: string) => void
  disabled?: boolean
}

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {
  const [titleNewTask, setTitleNewTask] = useState("")
  const [error, setError] = useState<string | null>(null)

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitleNewTask(e.currentTarget.value)
  }

  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (error !== null) {
      setError(null)
    }
    if (e.key === "Enter") {
      if (titleNewTask.trim() !== "") {
        props.addItem(titleNewTask)
        setTitleNewTask("")
      } else {
        setError("Title is required")
      }
    }
  }

  const onClickHandler = () => {
    if (titleNewTask.trim() !== "") {
      props.addItem(titleNewTask)
      setTitleNewTask("")
    } else {
      setError("Title is required")
    }
  }
  return (
    <div>
      <TextField
        style={{ marginTop: "10px" }}
        label={"Type value"}
        value={titleNewTask}
        onChange={onChangeHandler}
        onKeyDown={onKeyDownHandler}
        error={!!error}
        helperText={error}
        disabled={props.disabled}
      />

      <IconButton onClick={onClickHandler} color={"primary"} style={{ marginTop: "15px" }} disabled={props.disabled}>
        <AddCircleOutline />
      </IconButton>
    </div>
  )
})
