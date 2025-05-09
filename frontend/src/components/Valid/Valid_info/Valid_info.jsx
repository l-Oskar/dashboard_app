const Valid_info = ({ data }) => {
  if (!data) {
    return <p>No data available</p>;
  }

  if (typeof data === "string") {
    return <p>{data}</p>; // Відображаємо повідомлення про помилку
  }

  return (
    <div className="mt-4 p-4 border-2 border-gray-300 rounded-lg">
      <p>
        <strong>ID:</strong> {data.id || "Loading..."}
      </p>
      <p>
        <strong>Voting Power:</strong> {data.vo || "Loading..."}
      </p>
      <p>
        <strong>Delegator:</strong> {data.delegator?.hash || "Loading..."}
      </p>
    </div>
  );
};

export default Valid_info;
