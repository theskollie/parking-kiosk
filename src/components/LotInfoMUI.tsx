import React from "react";

//MUI
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

//Redux
import { useSelector } from "react-redux";
import { RootState } from "../features/store";

export default function LotInfoMUI() {
  //State
  const capacity = useSelector((state: RootState) => state.lot.capacity);
  const available = useSelector((state: RootState) => state.lot.available);
  const hourlyRate = useSelector((state: RootState) => state.lot.hourlyrate);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          bgcolor: "primary.dark",
        }}
      >
        <Typography variant="body1">
          <b>Available Slots:</b> {available} / {capacity}
        </Typography>
        <Typography variant="body1">
          <b>Hourly Rate:</b> ${hourlyRate} / hr
        </Typography>
      </AppBar>
    </Box>
  );
}
