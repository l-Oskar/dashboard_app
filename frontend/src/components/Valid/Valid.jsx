import { useEffect, useState } from "react";
import Valid_info from "./Valid_info/Valid_info";
import Valid_form from "./Valid_form/Valid_form";
import { Badge, Space } from "antd";

const Valid = () => {
  const [validators, setValidators] = useState([]);
  const [validatorInfo, setValidatorInfo] = useState([]); // Стан для введеної адреси

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/validators/");
        const validatorsData = await response.json();
        setValidators(validatorsData); // Зберігаємо дані валідаторів у стан
      } catch (error) {
        console.error("Error fetching data:", error);
        setValidators("Validator not found"); // Якщо сталася помилка, зберігаємо повідомлення про помилку
      }
    };

    fetchData(); // Викликаємо функцію для отримання даних
    // const interval = setInterval(fetchData, 5000); // Оновлюємо дані кожні 5 секунд
  }, [validatorInfo]); // Стан для результату пошуку

  return (
    <div className="">
      <h1 className="text-4xl">Validator</h1>
      <Space>
        <h2 className="text-2xl my-6">Validator status</h2>
        {validatorInfo && validatorInfo.jailed == false ? (
          <Badge status="success" />
        ) : (
          <Badge status="error" />
        )}
      </Space>
      <h3 className="text-1xl">
        {validatorInfo ? validatorInfo.delegator?.hash : "Loading address.."}
      </h3>
      {/* Передаємо функцію для оновлення результату в Valid_form */}
      {/* Передаємо результат у Valid_info */}
      <Valid_info className="mt-2" data={validatorInfo} />
      <Valid_form validators={validators} setValidatorInfo={setValidatorInfo} />
    </div>
  );
};

export default Valid;
