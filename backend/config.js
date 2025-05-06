require("dotenv").config();

module.exports = {
  VALIDATOR_ID: process.env.VALIDATOR_ID,
  API_URL: `https://api-mocha.celenium.io/v1/validators/${process.env.VALIDATOR_ID}`,
  CHECK_INTERVAL_CRON: process.env.CHECK_INTERVAL_CRON || "*/1 * * * *", // кожні 5 хвилин
  BOT_TOKEN: process.env.BOT_TOKEN,
  CHAT_ID: process.env.CHAT_ID,
};
