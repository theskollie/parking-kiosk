import React, { useEffect, useState } from "react";

//MUI
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import PaymentIcon from "@mui/icons-material/Payment";
import { Button, Alert } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";

//Redux
import { paid } from "../features/ticketSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../features/store";

interface ClientState {
  id: string;
  timeEntered: Date;
}

export default function ClientTicketMUI({ id, timeEntered }: ClientState) {
  //Redux Selectors
  const dispatch = useDispatch();
  const currentClient = useSelector((state: RootState) =>
    state.ticket.clients.find((client) => client.id === id)
  );
  const hourlyRate = useSelector((state: RootState) => state.lot.hourlyrate);

  //Logic Functions
  const timeinLot = (format = false): string => {
    const currentDate = new Date();
    let diff = (currentDate.getTime() - timeEntered.getTime()) / 1000;
    //Total Minutes in Lot
    const minutes = diff / 60;

    if (format === true) {
      if (minutes < 60) return `${Math.floor(minutes)} minutes`;
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = Math.floor(minutes % 60);
      return `${hours} hours ${remainingMinutes} minutes`;
    }

    return minutes.toFixed();
  };

  const balanceDue = () => {
    const minutes: number = parseInt(timeinLot());
    const minuteRate = hourlyRate / 60;
    return (minutes * minuteRate).toFixed();
  };

  const payBalance = () => {
    dispatch(paid(id));
    setOpened(true);
  };

  //Formatting
  const minutes =
    timeEntered.getMinutes() < 10
      ? `0${timeEntered.getMinutes()}`
      : timeEntered.getMinutes();

  const arrival = `${timeEntered.getHours()}:${minutes}`;

  const date = `${
    timeEntered.getMonth() + 1
  }-${timeEntered.getDate()}-${timeEntered.getFullYear()}`;

  const unique = id.substring(0, 8);

  //React States
  const [lotTime, setLotTime] = useState(timeinLot(true));
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    const refresh = setInterval(() => {
      setLotTime(timeinLot(true));
    }, 60000);

    return function cleanup() {
      clearInterval(refresh);
    };
  }, []);

  return (
    <>
      <Card
        sx={{
          minWidth: 300,
          minHeight: 250,
          paddingBottom: "10px",
          position: "relative",
        }}
      >
        <CardHeader
          title="Parking Lot Ticket"
          subheader={`ID: ${unique}`}
          sx={{
            textAlign: "center",
            backgroundColor: "#1976d2",
            color: "#ffff",
          }}
        />
        <CardContent
          sx={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography>
            <b>Arrival: </b> {arrival}
          </Typography>
          <Typography>
            <b>Date: </b> {date}
          </Typography>
          <Typography>
            <b>Time Parked: </b> {lotTime}
          </Typography>
          {currentClient !== undefined && currentClient.paid === false ? (
            <Typography>
              <b>Current Balance: ${balanceDue()}</b>
            </Typography>
          ) : null}
        </CardContent>
        {/* {currentClient !== undefined && currentClient.paid === false ? ( */}
        <CardActions sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            startIcon={<PaymentIcon />}
            onClick={() => payBalance()}
            disabled={currentClient?.paid ?? false}
          >
            {currentClient?.paid ? "Balance Paid" : "Pay Balance"}
          </Button>
        </CardActions>
      </Card>
      <Snackbar
        open={opened}
        autoHideDuration={4000}
        onClose={() => setOpened(false)}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          {`Balance Paid: $${balanceDue()}`}
        </Alert>
      </Snackbar>
    </>
  );
}
