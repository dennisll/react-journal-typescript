import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { NavBar } from "../components/NavBar";
import { type ReactNode } from "react";
import { useCustomLayout } from "../hooks/useLayout";
import { CustomSideBar } from "../components/CustomSideBar";

interface Props {
  //window?: () => Window;
  drawerWidth?: number;
  children: ReactNode;
}

export const AppLayout = (props: Props) => {
  const { drawerWidth = 280, children } = props;

  /* const container =
    window !== undefined ? () => window().document.body : undefined;
 */
  const {
    mobileOpen,
    handleDrawerClose,
    handleDrawerTransitionEnd,
    handleDrawerToggle,
  } = useCustomLayout();

  return (
    <Box sx={{ display: "flex" }}>

      <NavBar
        handleDrawerToggle={handleDrawerToggle}
        drawerWidth={drawerWidth}
      />

      <CustomSideBar
        mobileOpen={mobileOpen}
        handleDrawerClose={handleDrawerClose}
        handleDrawerTransitionEnd={handleDrawerTransitionEnd}
      />

      <Box
          sx={{
            width: { xs: "0px", sm: `${drawerWidth}px` },
          }}
      ></Box> 

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />

        {children}
      </Box>
    </Box>
  );
};
