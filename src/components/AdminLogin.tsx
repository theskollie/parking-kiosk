import { Box, Typography, TextField, Button, Paper } from "@mui/material";
import React, { useState } from "react";

interface LoginProps {
  setAdmin: React.Dispatch<React.SetStateAction<boolean>>;
}

const AdminLogin = ({ setAdmin }: LoginProps) => {
  const [value, setValue] = useState("");

  const validateLogin = () => {
    //Store Admin Password in .env or DB in production
    if (value === "Demo") {
      setAdmin(true);
      return;
    }
    setValue("");
    alert("Incorrect Password");
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: 'url("./pattern.jpg")',
        backgroundPosition: "center center",
        backgroundSize: "cover",
      }}
    >
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 120px",
          backgroundColor: "rgba(0,0,0,0.55)",
        }}
      >
        <Typography sx={{ marginBottom: "10px", color: "white" }} variant="h4">
          Admin Login
        </Typography>
        <Typography sx={{ color: "white" }}>Demo Password: Demo</Typography>
        <TextField
          value={value}
          onChange={(e) => setValue(e.target.value)}
          variant="outlined"
          sx={{ bgcolor: "white", margin: "10px 0px" }}
        />
        <Button
          onClick={() => validateLogin()}
          sx={{ marginTop: "10px" }}
          variant="contained"
        >
          Login
        </Button>
      </Paper>
    </Box>
  );
};

export default AdminLogin;
