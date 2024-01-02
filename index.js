const TelegramAPI = require("node-telegram-bot-api");

const token = "6773668852:AAHWkNIc-doC8mWo6llIuOuQ3PopbLaWTtU";

const bot = new TelegramAPI(token, { polling: true });

const chats = {}

const gameOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{ text: '0', callback_data: '0' }, { text: '1', callback_data: '1' }, { text: '2', callback_data: '2' }],

            [{ text: '3', callback_data: '3' }, { text: '4', callback_data: '4' }, { text: '5', callback_data: '5' }],

            [{ text: '6', callback_data: '6' }, { text: '7', callback_data: '7' }, { text: '8', callback_data: '8' }],

            [{ text: '9', callback_data: '9' }]
        ]
    })
}

bot.setMyCommands([
    { command: '/start', description: 'начало переписки' },
    { command: 'game', description: 'Игра началась!' },
])


bot.on("message", async(msg) => {
    const text = msg.text;
    const ChatId = msg.chat.id;
    const time_send = new Date(msg.date * 1000);



    if (text == '/start') {

        if (msg.from.first_name != undefined && msg.from.last_name != undefined) {
            return bot.sendMessage(ChatId, "Привет, " +
                msg.from.first_name + " " + msg.from.last_name + "! Это мой телеграм бот.");
        } else if (msg.from.first_name == undefined) {

            return bot.sendMessage(ChatId, "Привет, " + msg.from.last_name + "! это мой телеграм ${123} бот.");
        } else if (msg.from.last_name == undefined) {
            bot.sendMessage(ChatId, "Привет, " + msg.from.first_name + "! Это мой телеграм бот.");
            // bot.sendMessage(ChatId, "дата отправки вашего сообщения:" + time_send);
            // console.log(`Дата и время: ${time_send}`);
        }

    }
    if (text == "/game") {
        await bot.sendMessage(ChatId, "Угадай число от 0 до 9!");
        const rN = Math.floor(Math.random() * 10);
        bot.sendMessage(ChatId, rN);
        chats[ChatId] = rN;
        return bot.sendMessage(ChatId, "Отгадывай!", gameOptions);
    }
    // bot.sendMessage(ChatId, "ты написал мне " + text);
    // console.log(msg);
});

bot.on("callback_query", async msg => {
    const data = msg.data;
    const chatId = msg.message.chat.id;

    if (data == chats[chatId]) {
        return await bot.sendMessage(chatId, `Ты выбрал правильное число ${data}`);
    } else {
        return await bot.sendMessage(chatId, `Ты выбрал не правильное число ${data}`);
    }
    bot.sendMessage(chatId, `Ты выбрал число ${data}`);
    console.log(msg);
})