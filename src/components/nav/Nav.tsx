import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

const navItems = [
  { label: "Home", path: "/home" },
  { label: "Budget", path: "/budget" },
  { label: "Income/Expenses", path: "/income-expenses" },
  { label: "Profile", path: "/profile" },
];

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <AppBar position="static" sx={{ mb: 2 }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Finance Tracker
        </Typography>
        <Box>
          {navItems.map((item) => (
            <Button
              key={item.path}
              color="inherit"
              onClick={() => navigate(item.path)}
              sx={{
                borderBottom:
                  location.pathname === item.path ? "2px solid white" : "none",
              }}
            >
              {item.label}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;