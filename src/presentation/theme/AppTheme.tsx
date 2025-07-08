import {ThemeProvider}  from "@mui/material/styles"
import type { FC, ReactNode } from "react"
import { appTheme } from "./appTheme"
import { CssBaseline } from "@mui/material"

interface Props{
   children: ReactNode
}

export const AppTheme: FC<Props> = ({children}) => {
  return (
    <ThemeProvider theme={appTheme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}
