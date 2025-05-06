import styles from "./Request.module.scss";
import { sendJsonRpcRequest } from "../../utils/connection";
import React, { useEffect, useState } from "react";
import SyncState from "../SyncState/SyncState";

const Request = () => {
  const [response, setResponse] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const syncState = await sendJsonRpcRequest(
          "/api",
          "header.SyncState",
          []
        );
        const blockHeight = await sendJsonRpcRequest(
          "/api",
          "header.LocalHead",
          []
        );
        const accountAddress = await sendJsonRpcRequest(
          "/api",
          "state.AccountAddress",
          []
        );
        setResponse({
          syncState: syncState.result,
          blockHeight: blockHeight.result,
          accountAddress: accountAddress.result,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.container}>
      <SyncState data={response?.syncState} />
      <h3>{response ? response.accountAddress : "Loading..."}</h3>
    </div>
  );
};

export default Request;
