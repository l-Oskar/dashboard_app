const express = require("express");
const cors = require("cors");
const {
  getValidatorData,
  getValidators,
  getValidatorByAddress,
} = require("./index");

//const AUTH_TOKEN = process.env.AUTH_TOKEN || "tok"; // Replace with your actual token

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

let lastStatus = null;

app.get("/api/", (req, res) => {
  res.send("Alert 1.0.0");
});

app.get("/api/getValidatorByAddress/:address", async (req, res) => {
  const { address } = req.params;
  try {
    const data = await getValidatorByAddress(address);
    res.json(data);
  } catch (error) {
    console.error("Error fetching validator by address:", error);
    res.status(500).json({ error: "Failed to fetch validator by address" });
  }
});

app.get("/api/status", async (req, res) => {
  res.json(lastStatus || { message: "No status available" });
});

app.get("/api/validators/", async (req, res) => {
  try {
    const data = await getValidators();
    res.json(data);
  } catch (error) {
    console.error("Error fetching validators:", error);
    res.status(500).json({ error: "Failed to fetch validators" });
  }
});

app.get("/api/validators/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await getValidatorData(id);
    res.json(data);
    console.log(data);
  } catch (error) {
    console.error("Error fetching validator data:", error);
    res.status(500).json({ error: "Failed to fetch validator data" });
  }
});

async function updateStatus(id) {
  try {
    const data = await getValidatorData(id);
    lastStatus = data;
  } catch (error) {
    console.error("Error updating status:", error);
  }
}

app.listen(PORT, () => {
  console.log(`Backend API running on http://localhost:${PORT}`);
});

/// Endpoint: /api/status BRIDGE!
// app.get("/api/status", async (req, res) => {
//   try {
//     const response = await axios.post(
//       "http://193.34.212.47:26658",
//       {
//         jsonrpc: "2.0",
//         id: 1,
//         method: "header.SyncState",
//         params: [],
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${AUTH_TOKEN}`,
//         },
//       }
//     );
//     res.send(response.data);
//   } catch (error) {
//     console.error("Error in /api:", error.message);
//     res.status(500).send({ error: "Failed to fetch data from RPC server" });
//   }
// });
