import { Box, Button, Slider, Typography } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import React, { useState } from "react";

//Redux
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../features/store";
import { setCapacity, setHourlyRate, setAvailable } from "../features/lotSlice";

const styles = {
  marginTop: "20px",
  display: "flex",
  justifyContent: "center",
};

const LotConfig = () => {
  const capacity = useSelector((state: RootState) => state.lot.capacity);
  const hourlyRate = useSelector((state: RootState) => state.lot.hourlyrate);
  const clients = useSelector((state: RootState) => state.ticket.clients);

  const [newCapacity, setNewCapacity] = useState(capacity);
  const [newHourlyRate, setNewHourlyRate] = useState(hourlyRate);
  const [changes, setChanges] = useState(false);
  const [snackInfo, setSnackInfo] = useState({
    open: false,
    message: "Default",
  });

  const dispatch = useDispatch();

  const dispatchChanges = () => {
    let changes = false;
    if (capacity !== newCapacity) {
      dispatch(setCapacity(newCapacity));
      if (newCapacity <= clients.length) {
        dispatch(setAvailable(0));
      } else {
        dispatch(setAvailable(newCapacity - clients.length));
      }

      changes = true;
    }
    if (hourlyRate !== newHourlyRate) {
      dispatch(setHourlyRate(newHourlyRate));
      changes = true;
    }
    if (changes === true) {
      setSnackInfo({
        message: "Update Complete",
        open: true,
      });
      setChanges(false);
      return;
    }
    setSnackInfo({
      message: "No changes made.",
      open: true,
    });
    setChanges(false);
  };

  return (
    <Box style={styles}>
      <Box
        sx={{
          width: "400px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography sx={{ textAlign: "center" }}>
          Lot Capacity: {newCapacity}{" "}
        </Typography>
        <Slider
          step={1}
          value={newCapacity}
          onChange={(e) => {
            const event = e.target as HTMLInputElement;
            setNewCapacity(parseInt(event.value));
            setChanges(true);
          }}
          min={0}
          max={300}
          valueLabelDisplay="auto"
        />
        <Typography sx={{ textAlign: "center" }}>
          Hourly Rate: {newHourlyRate}{" "}
        </Typography>
        <Slider
          step={1}
          defaultValue={hourlyRate}
          value={newHourlyRate}
          onChange={(e) => {
            const event = e.target as HTMLInputElement;
            setNewHourlyRate(parseInt(event.value));
            setChanges(true);
          }}
          min={1}
          max={50}
          valueLabelDisplay="auto"
        />
        {changes && (
          <Button variant="contained" onClick={() => dispatchChanges()}>
            Submit Changes
          </Button>
        )}
      </Box>
      <Snackbar
        open={snackInfo.open}
        message={snackInfo.message}
        autoHideDuration={4000}
        onClose={() =>
          setSnackInfo({
            ...snackInfo,
            open: false,
          })
        }
      />
    </Box>
  );
};

export default LotConfig;
