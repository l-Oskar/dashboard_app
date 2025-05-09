import { useEffect, useState } from "react";

function TestFront() {
  const [address, setAddress] = useState(""); // Стан для введеної адреси
  const [validatorId, setValidatorId] = useState(null); // Стан для ID валідатора
  const [data, setData] = useState([]); // Стан для даних валідаторів

  // Функція для отримання даних валідаторів
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/validators/"); // Замініть URL на ваш API
        const result = await response.json();
        setData(result); // Припускаємо, що API повертає масив валідаторів
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Функція для пошуку валідатора за адресою
  const handleSearch = () => {
    if (data && data.length > 0) {
      const validator = data.find(
        (validator) =>
          validator.address.hash === address ||
          validator.delegator.hash === address
      );
      if (validator) {
        setValidatorId(validator.id); // Зберігаємо ID знайденого валідатора
      } else {
        setValidatorId("Validator not found"); // Якщо валідатор не знайдений
      }
    }
  };

  return (
    <div>
      <h1>Test Frontend</h1>
      <h2>Validator ID: {validatorId || "Enter an address to search"}</h2>
      <div className="mt-4">
        <input
          id="validatorAddress"
          className="border-2 border-blue-400 rounded p-2 mr-2"
          placeholder="Enter validator address"
          value={address}
          onChange={(e) => setAddress(e.target.value)} // Оновлюємо стан адреси
        />
        <button
          className="bg-blue-500 text-white rounded p-2 hover:bg-blue-600"
          onClick={handleSearch} // Викликаємо пошук при натисканні кнопки
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default TestFront;
