//React
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

//Redux
import { useSelector, useDispatch } from "react-redux";
import { park, leave } from "../features/lotSlice";
import { assign, deassign } from "../features/ticketSlice";
import { RootState } from "../features/store";

//MUI
import {
  Container,
  Typography,
  Button,
  Box,
  Paper,
  Alert,
  AlertColor,
} from "@mui/material";
import TollIcon from "@mui/icons-material/Toll";
import LogoutIcon from "@mui/icons-material/Logout";
import Snackbar, { snackbarClasses } from "@mui/material/Snackbar";

import { v4 as uuidv4 } from "uuid";

interface Client {
  id: string;
  entertime: string;
  paid: boolean;
}

interface SnackProps {
  opened: boolean;
  message: string;
  severity: AlertColor;
}

const ParkVehicleMUI = () => {
  const dispatch = useDispatch();
  const available = useSelector((state: RootState) => state.lot.available);
  const navigate = useNavigate();
  const [snackBarInfo, setSnackBarInfo] = useState<SnackProps>({
    opened: false,
    message: "Default",
    severity: "success",
  });

  const [id, setID] = useState(localStorage.getItem("id"));
  const clients = useSelector((state: RootState) => state.ticket.clients);
  let currentClient: Client | undefined = undefined;

  if (id !== null) {
    currentClient = clients.find((client) => client.id === id);
  }

  if (currentClient === undefined) {
    localStorage.removeItem("id");
  }

  const exitLot = () => {
    if (currentClient !== undefined && currentClient.paid === true) {
      dispatch(deassign(currentClient.id));
      dispatch(leave());
      setID(null);
      setSnackBarInfo({
        ...snackBarInfo,
        message: "Thank you for visiting!",
        opened: true,
      });
      return;
    }
    setSnackBarInfo({
      severity: "error",
      message: "You have not paid.",
      opened: true,
    });
  };

  const enterLot = () => {
    if (available === 0) {
      setSnackBarInfo({
        severity: "error",
        message: "Lot Full!",
        opened: true,
      });
      return false;
    }
    const id = uuidv4();
    const date = new Date().toJSON();
    dispatch(
      assign({
        id,
        date,
      })
    );
    dispatch(park());

    localStorage.setItem("id", `${id}`);
    navigate("/tickets");
  };

  return (
    <Box
      sx={{
        backgroundImage: 'url("./carlot2.jpg")',
        backgroundPosition: "center center",
        backgroundSize: "cover",
      }}
    >
      <Container
        sx={{
          height: "93vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper
          sx={{
            backgroundColor: "rgba(0,0,0,0.4)",
            padding: "30px",
            color: "white",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: "25px",
          }}
        >
          {id === null ? (
            <>
              <Typography my={2} variant="h2" align="center">
                Welcome to the Mall Parking Lot!
              </Typography>

              <Box my={3}>
                <Button
                  size="large"
                  variant="contained"
                  startIcon={<TollIcon />}
                  onClick={() => enterLot()}
                  name="enterLot"
                >
                  Enter Lot
                </Button>
              </Box>
            </>
          ) : (
            <>
              <Typography my={2} variant="h2" align="center">
                Thank you for visiting!
              </Typography>

              <Box my={3}>
                <Button
                  size="large"
                  variant="contained"
                  startIcon={<LogoutIcon />}
                  onClick={() => exitLot()}
                  name="exitLot"
                >
                  Exit Lot
                </Button>
              </Box>
            </>
          )}
        </Paper>
      </Container>

      <Snackbar
        open={snackBarInfo.opened}
        autoHideDuration={4000}
        onClose={() =>
          setSnackBarInfo({
            ...snackBarInfo,
            opened: false,
          })
        }
      >
        <Alert severity={snackBarInfo.severity} sx={{ width: "100%" }}>
          {snackBarInfo.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ParkVehicleMUI;
