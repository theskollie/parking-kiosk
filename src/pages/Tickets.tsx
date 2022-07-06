import React from "react";

import { ClientTicketMUI, LotInfoMUI } from "../components/allComponents";
import { useSelector } from "react-redux";
import { RootState } from "../features/store";
import { Box, Button, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Tickets = () => {
  const id = localStorage.getItem("id");
  const ticket = useSelector((state: RootState) => state.ticket.clients);

  if (id === null)
    return (
      <>
        <LotInfoMUI />

        <Box
          sx={{
            width: "100%",
            height: "92vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: "20px",
            backgroundImage: 'url("./pattern.jpg")',
            backgroundPosition: "center center",
            backgroundSize: "cover",
          }}
        >
          <Paper
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: "20px",
              padding: "40px 120px",
              backgroundColor: "rgba(0,0,0,0.55)",
            }}
          >
            <Typography variant="h4" sx={{ color: "white" }}>
              No Ticket Found
            </Typography>
            <Link to="/">
              <Button size="large" variant="contained">
                Go Back
              </Button>
            </Link>
          </Paper>
        </Box>
      </>
    );

  const myTicket = ticket.filter((ticket) => ticket.id === id)[0];
  if (myTicket === undefined) localStorage.removeItem("id");

  return (
    <>
      {
        <>
          <LotInfoMUI />

          <Box
            sx={{
              width: "100%",
              height: "90vh",
              display: "flex",
              alignItems: "center",
              justifyContent: " center",
              flexDirection: "column",
              backgroundImage: 'url("./pattern.jpg")',
              backgroundPosition: "center center",
              backgroundSize: "cover",
              gap: "20px",
              position: "relative",
            }}
          >
            <ClientTicketMUI
              id={id}
              timeEntered={new Date(myTicket.entertime)}
            />
            <Paper
              sx={{
                backgroundColor: "rgba(0,0,0,0.55)",
                position: "absolute",
                bottom: "0",
                marginBottom: "5px",
              }}
            >
              <Typography sx={{ textAlign: "center", color: "white" }}>
                You should leave the lot within 15 minutes after payment.
              </Typography>
            </Paper>
          </Box>
        </>
      }
    </>
  );
};

export default Tickets;
