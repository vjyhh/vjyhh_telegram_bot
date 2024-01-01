const TelegramAPI = require("node-telegram-bot-api");

const token = "6773668852:AAHWkNIc-doC8mWo6llIuOuQ3PopbLaWTtU";

const bot = new TelegramAPI(token, { polling: true });

bot.on("message", (msg) => {
  const text = msg.text;
  const ChatId = msg.chat.id;
  // if (ChatId == 5287944367) {
  //   bot.sendMessage(ChatId, "ты забанен вхвхвхвх");
  //   return 0;
  // }
  bot.sendMessage(ChatId, "ты написал мне " + text);
  console.log(msg);
});
