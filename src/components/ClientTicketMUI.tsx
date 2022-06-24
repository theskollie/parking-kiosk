import React, { useState } from "react";

//MUI
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import PaymentIcon from "@mui/icons-material/Payment";
import { Button } from "@mui/material";

//Redux
import { paid } from "../features/ticketSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../features/store";

interface ClientState {
  id: string;
  timeEntered: Date;
}

export default function ClientTicketMUI({ id, timeEntered }: ClientState) {
  const dispatch = useDispatch();
  const currentClient = useSelector((state: RootState) =>
    state.ticket.clients.find((client) => client.id === id)
  );
  const hourlyRate = useSelector((state: RootState) => state.lot.hourlyrate);

  const timeinLot = (format = false): string => {
    const currentDate = new Date();
    let diff = (currentDate.getTime() - timeEntered.getTime()) / 1000;
    //Total Minutes in Lot
    const minutes = diff / 60;

    if (format === true) {
      if (minutes < 60) return `${Math.floor(minutes)} minutes`;
      const hours = Math.floor(diff / 60);
      const remainingMinutes = Math.floor(diff % 60);
      return `${hours} hours ${remainingMinutes} minutes`;
    }

    return minutes.toFixed();
  };

  const balanceDue = () => {
    const minutes: number = parseInt(timeinLot());
    const minuteRate = hourlyRate / 60;
    if (minutes < 60) return (minutes * minuteRate).toFixed();

    return (minutes * minuteRate).toFixed();
  };

  const minutes =
    timeEntered.getMinutes() < 10
      ? `0${timeEntered.getMinutes()}`
      : timeEntered.getMinutes();

  const arrival = `${timeEntered.getHours()}:${minutes}`;

  const date = `${
    timeEntered.getMonth() + 1
  }-${timeEntered.getDate()}-${timeEntered.getFullYear()}`;

  const payBalance = () => {
    const response = window.confirm(`Pay $${balanceDue()}`);
    if (response === true) {
      dispatch(paid(id));
    }
  };

  const unique = id.substring(0, 8);
  return (
    <Card sx={{ minWidth: 300, minHeight: 250, paddingBottom: "10px" }}>
      <CardHeader
        title="Parking Lot Ticket"
        subheader={`ID: ${unique}`}
        sx={{ textAlign: "center", backgroundColor: "#1976d2", color: "#ffff" }}
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
          <b>Time Parked: </b> {timeinLot(true)}
        </Typography>
        {currentClient !== undefined && currentClient.paid === false ? (
          <Typography>
            <b>Current Balance: ${balanceDue()}</b>
          </Typography>
        ) : null}
      </CardContent>
      {currentClient !== undefined && currentClient.paid === false ? (
        <CardActions sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            startIcon={<PaymentIcon />}
            onClick={() => payBalance()}
          >
            Pay Balance
          </Button>
        </CardActions>
      ) : (
        <Typography variant={"h6"} sx={{ textAlign: "center" }}>
          Balance Paid
        </Typography>
      )}
    </Card>
  );
}
