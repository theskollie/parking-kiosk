import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";

//Components
import { HeaderMUI } from "./components/allComponents";

//Pages
import { Tickets, Home, Admin } from "./pages/index";

function App() {
  return (
    <div className="App">
      <div className="contentWrap">
        <HeaderMUI />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
