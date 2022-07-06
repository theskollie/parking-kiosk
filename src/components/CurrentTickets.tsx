import React, { useMemo } from "react";
import ClientTicketMUI from "./ClientTicketMUI";
import { useSelector } from "react-redux";
import { RootState } from "../features/store";
import { Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";

const CurrentTickets = () => {
  const clients = useSelector((state: RootState) => state.ticket.clients);

  const cards = useMemo(() => {
    return clients.map((client) => {
      return (
        <Grid key={client.id} item xs={4}>
          <ClientTicketMUI
            id={client.id}
            timeEntered={new Date(client.entertime)}
          />
        </Grid>
      );
    });
  }, [clients]);

  return (
    <div>
      {cards.length > 0 ? (
        <Container>
          <Typography
            variant="h4"
            sx={{ textAlign: "center", margin: "20px 0px 20px 0px" }}
          >
            Outstanding Tickets:
          </Typography>
          <Grid spacing={3} container>
            {cards}
          </Grid>
        </Container>
      ) : (
        <Container sx={{ textAlign: "center" }}>
          <h2>Empty Lot..</h2>
        </Container>
      )}
    </div>
  );
};

export default CurrentTickets;
