import { useState } from "react";

const Valid_form = ({ validators, setValidatorInfo }) => {
  const [address, setAddress] = useState(""); // Стан для введеної адреси

  const handleSubmit = (e) => {
    e.preventDefault(); // Запобігаємо перезавантаженню сторінки

    // Логіка пошуку адреси
    if (validators && validators.length > 0) {
      const validator = validators.find(
        (validator) =>
          validator.address.hash === address ||
          validator.delegator.hash === address
      );

      if (validator) {
        setValidatorInfo(validator);
      } else {
        setValidatorInfo("Validator not found"); // Передаємо повідомлення про помилку
      }
    }
  };

  return (
    <div className="clas">
      <div className="mt-4">
        <input
          id="validatorAddress"
          className="border-2 border-blue-400 rounded p-2 mr-2 w-100"
          placeholder="Enter validator address"
          value={address}
          onChange={(e) => setAddress(e.target.value)} // Оновлюємо стан адреси
        />
        <button
          className="bg-blue-500 text-white rounded p-2 hover:bg-blue-600"
          onClick={handleSubmit} // Викликаємо пошук при натисканні кнопки
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default Valid_form;
