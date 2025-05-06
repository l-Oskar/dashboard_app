import React from "react";

const SyncState = ({ data }) => {
  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <h3>Sync State</h3>
      <p>Height: {data.height}</p>
      <p>
        Sync Progress: {data.to_height < data.height ? "100%" : "Not Ready"}
      </p>
      {/* Добавьте другие поля, если они есть */}
    </div>
  );
};

export default SyncState;
