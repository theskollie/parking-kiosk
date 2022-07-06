import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";

//MUI Icons
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";

import { Link } from "react-router-dom";

export default function HeaderMUI() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Link to="/">
              <Button
                sx={{
                  color: "white",
                  fontSize: "20px",
                }}
                size="large"
                variant="text"
                startIcon={<DirectionsCarIcon />}
              >
                Parking Lot
              </Button>
            </Link>
          </Box>
          <Link to="/">
            <Button
              sx={{ color: "white" }}
              variant="text"
              color="error"
              name="home"
            >
              Home
            </Button>
          </Link>
          <Link to="/tickets">
            <Button
              sx={{ color: "white" }}
              variant="text"
              color="error"
              name="payment"
            >
              Payment
            </Button>
          </Link>
          <Link to="/admin">
            <Button sx={{ color: "white" }} variant="text" color="error">
              Admin
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
