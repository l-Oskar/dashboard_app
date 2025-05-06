const axios = require("axios");
const cron = require("node-cron");
const {
  API_URL,
  CHECK_INTERVAL_CRON,
  BOT_TOKEN,
  CHAT_ID,
} = require("./config");

async function sendTelegramMessage(message) {
  try {
    const response = await axios.post(
      "https://api.telegram.org/bot" + BOT_TOKEN + "/sendMessage",
      {
        chat_id: parseInt(CHAT_ID),
        text: message,
      }
    );

    if (response.status === 200) {
      console.log("Message sent successfully");
    } else {
      console.error("Failed to send message:", response.statusText);
    }
  } catch (error) {
    console.error("Error sending message:", error);
  }
}

async function getValidatorData() {
  try {
    const response = await axios.get(API_URL);
    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error fetching validator data:", error);
  }
}

async function getValidators() {
  try {
    const response = await axios.get(
      "https://api-mocha.celenium.io/v1/validators?limit=100"
    );
    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error fetching validators data:", error);
  }
}

async function checkValidatorStatus() {
  try {
    const data = await getValidatorData();

    const jailed = data.jailed;
    const votingPower = Number(data.voting_power || 0);

    console.log(`[${new Date().toLocaleString()}] Перевірка валідатора:`);
    console.log(` - jailed: ${jailed}`);
    console.log(` - voting power: ${votingPower}`);

    if (jailed || votingPower === 0) {
      console.warn("⚠️ Проблема з валідатором! Перевірте статус.");
      sendTelegramMessage(
        "⚠️ Проблема з валідатором! Перевірте статус.\n" +
          `jailed: ${jailed}\n` +
          `voting power: ${votingPower}`
      );
    } else {
      console.log("✅ Все гаразд.");
    }
  } catch (error) {
    console.error("❌ Помилка при отриманні статусу:", error.message);
  }
}

// cron.schedule(CHECK_INTERVAL_CRON, () => {
//   checkValidatorStatus();
// });

module.exports = {
  getValidatorData,
  checkValidatorStatus,
  getValidators,
};
