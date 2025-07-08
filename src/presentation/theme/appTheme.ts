import type { Theme } from "@emotion/react";
import { createTheme } from "@mui/material";

export const appTheme: Theme = createTheme({
  palette: {
    primary: {
      main: "#0554ca",
    },
    secondary: {
      main: "#1f09e9",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
    h1: {
      fontSize: "2.5rem", //"2.5rem",
      fontWeight: 200,
    },
  },
  spacing: 8,
});

/* 
    primary: { main: "#262254" },
    secondary: { main: "#543884" },
    error: { main: red.A400 },
     
*/
