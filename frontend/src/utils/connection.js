import axios from "axios";

export const AUTH_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBbGxvdyI6WyJwdWJsaWMiLCJyZWFkIl0sIk5vbmNlIjoibFdSQU5vaHhtOGRNOUZGRFgwc21wTUtaS21rcmd6RWFTcFp4eGE4WWxmVT0iLCJFeHBpcmVzQXQiOiIwMDAxLTAxLTAxVDAwOjAwOjAwWiJ9.OvkCwB8QL5JFjrL6lkrQsXeAWj0zVOCEEj9FIl2FH9o"; // Убедитесь, что AUTH_TOKEN определен в .env файле

export const sendJsonRpcRequest = async (url, method, params = [], id = 1) => {
  try {
    const data = {
      jsonrpc: "2.0",
      id: id,
      method: method,
      params: params,
    };

    // Логируем запрос перед отправкой
    // console.log("Sending JSON-RPC Request:", {
    //   url,
    //   data,
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${AUTH_TOKEN}`,
    //   },
    // });

    // Отправляем запрос
    const response = await axios.post(url, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AUTH_TOKEN}`,
      },
    });

    console.log("Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error sending JSON-RPC request:", error.message);
    throw error;
  }
};
