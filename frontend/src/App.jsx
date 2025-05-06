import { useState } from "react";
import { sendJsonRpcRequest } from "./utils/connection";
import Request from "./components/Request/Request";
import TestFront from "./components/TestFront/TestFront";
import "./App.css";

function App() {
  return (
    <>
      <h1>Dashboard</h1>
      <Request />
      {/* <TestFront /> */}
    </>
  );
}

export default App;
