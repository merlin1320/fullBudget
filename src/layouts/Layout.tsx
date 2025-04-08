import { Box, Toolbar, useTheme } from "@mui/material";
import React, { FC } from "react";
import Navbar from "../components/nav/Nav";
import { Outlet } from "react-router-dom";

export const Layout: FC = () => {
  const { breakpoints } = useTheme();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />

      {/* Toolbar = spacer for AppBar height */}
      <Toolbar sx={{ paddingTop: 1 }} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          padding: 2,
          [breakpoints.up("sm")]: {
            paddingLeft: 4,
            paddingRight: 4,
          },
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
