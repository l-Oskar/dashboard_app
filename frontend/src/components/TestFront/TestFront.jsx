import { useEffect, useState } from "react";
// import './App.css';

function TestFront() {
  const [status, setStatus] = useState(null);
  const [peers, setPeers] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/api/status")
      .then((res) => res.json())
      .then(setStatus)
      .catch(console.error);

    // fetch("http://localhost:3001/api/peers")
    //   .then((res) => res.json())
    //   .then(setPeers)
    //   .catch(console.error);
  }, [1000]);

  return (
    <div className="p-4 text-white bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">🌉 Celestia Bridge Dashboard</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">Node Status</h2>
        <pre className="bg-gray-800 p-2 rounded mt-2 overflow-x-auto">
          {status
            ? JSON.stringify(status.result.height, null, 2)
            : "Loading..."}
        </pre>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Peers</h2>
        <pre className="bg-gray-800 p-2 rounded mt-2 overflow-x-auto">
          {peers ? JSON.stringify(peers, null, 2) : "Loading..."}
        </pre>
      </section>
    </div>
  );
}

export default TestFront;
