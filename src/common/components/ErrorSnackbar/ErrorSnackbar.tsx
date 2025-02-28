import { SyntheticEvent, useState } from "react"
import Alert from "@mui/material/Alert"
import Snackbar from "@mui/material/Snackbar"
import { useAppSelector } from "common/hooks/useAppSelector"
import { selectError } from "../../../app/app-selector"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { setAppError } from "../../../app/appSlice"

export const ErrorSnackbar = () => {
  const dispatch = useAppDispatch()
  const error = useAppSelector(selectError)

  const handleClose = (_: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return
    }
    dispatch(setAppError({ error: null })) // Сброс ошибки при закрытии
  }

  return (
    <Snackbar open={!!error} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error" variant="filled">
        {error}
      </Alert>
    </Snackbar>
  )
}
