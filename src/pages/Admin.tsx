import React, { useState } from "react";
import {
  CurrentTickets,
  AdminLogin,
  LotConfig,
} from "../components/allComponents";

const Admin = () => {
  const [admin, setAdmin] = useState(false);
  return (
    <>
      {admin ? (
        <>
          <LotConfig />
          <CurrentTickets />
        </>
      ) : (
        <AdminLogin setAdmin={setAdmin} />
      )}
    </>
  );
};

export default Admin;
