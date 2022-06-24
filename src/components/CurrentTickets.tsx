import React from "react";
import ClientTicketMUI from "./ClientTicketMUI";
import { useSelector } from "react-redux";
import { RootState } from "../features/store";
import { Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";

const CurrentTickets = () => {
  const clients = useSelector((state: RootState) => state.ticket.clients);

  const cards = clients.map((client) => {
    return (
      <Grid item xs={4}>
        <ClientTicketMUI
          key={client.id}
          id={client.id}
          timeEntered={client.entertime}
        />
      </Grid>
    );
  });

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
        <h2>Emtpy Lot..</h2>
      )}
    </div>
  );
};

export default CurrentTickets;
