import { Typography } from "@mui/material"
import Grid from "@mui/material/Grid"
import type { FC, ReactNode } from "react"

interface Props{
    children: ReactNode;
    title: string;
}

export const AuthLayout: FC<Props> = ({children, title=''}) => {
  return (
    <Grid
      container
      spacing={1}
      alignItems="center"
      justifyContent="center"
      sx={{minHeight: '100vh', backgroundColor: 'primary.main', padding: 4}}
    >
        <Grid
           //size={3}
           size={{ xs: 9}}
           sx={{
              width:{ sm: 450},
              backgroundColor: "white",
              padding: 3,
              borderRadius: 2

           }}
        >
            <Typography variant="h5" sx={{ mb: 1}}>{title}</Typography>
            {children}
        </Grid>
    </Grid>
  )
}
