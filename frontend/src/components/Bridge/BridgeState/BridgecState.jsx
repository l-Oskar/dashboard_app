import React from "react";

const SyncState = ({ data }) => {
  if (!data) return <p>Loading...</p>;

  return (
    <div className="border-2 border-gray-300 p-4 rounded-lg mt-10">
      <h3>Sync State</h3>
      <p>Height: {data.height}</p>
      <p>
        Sync Progress: {data.to_height < data.height ? "100%" : "Syncing..."}
      </p>
      {/* Добавьте другие поля, если они есть */}
    </div>
  );
};

export default SyncState;
