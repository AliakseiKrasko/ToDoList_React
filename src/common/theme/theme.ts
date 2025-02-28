import { createTheme } from "@mui/material/styles"
import type { ThemeMode } from "../../app/appSlice"

export const getTheme = (themeMode: ThemeMode) => {
  return createTheme({
    palette: {
      mode: themeMode,
      primary: {
        main: "#087EA4",
      },
    },
  })
}
