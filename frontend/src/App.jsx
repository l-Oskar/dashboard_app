import { useState } from "react";
import { sendJsonRpcRequest } from "./utils/connection";
import TestFront from "./components/TestFront/TestFront";
import "./App.css";
import Bridge from "./components/Bridge/Bridge";
import Valid from "./components/Valid/Valid";

function App() {
  return (
    <>
      <div className="flex">
        <div className="size-14 grow-7">
          <h1 className="text-4xl">Bridge</h1>
          <Bridge />
        </div>
        <div className="size-14 grow-0"></div>
        <div className="size-14 grow-7">
          <Valid />
        </div>
        {/* <TestFront /> */}
      </div>
    </>
  );
}

export default App;
