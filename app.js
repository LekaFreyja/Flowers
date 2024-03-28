const TelegramBot = require('node-telegram-bot-api');

const API_KEY_BOT = '6584920536:AAHwdvrjktGzaHWQexgar9Qq5T9sV81Y1iU';

const bot = new TelegramBot(API_KEY_BOT, {
    polling: true
})
const commands = [
    {
        command: 'start',
        description: 'запуск'
    },
    {
        command: 'keyb',
        description: 'клавиатура'
    },
    {
        command: 'help',
        description: 'помощь'
    },
    {
        command: 'my',
        description: 'собрать самому'
    },
    {
        command: 'code',
        description: 'ввести код понравишегося букета'
    }

]
bot.setMyCommands(commands)
let latest = []
function handleBackButton(word, latest) {
    for (let i = 0; i<latest.length; i++) {
        if(word !== latest[i]) {
            latest.push(word)
        }
    }
}
bot.onText(/\/start/, async (msg) => {
    try {
        const userName = msg.chat.first_name;
        let word = msg.text
        handleBackButton()
        await bot.sendMessage(msg.chat.id, "Здравствуйте!")
        await bot.sendMessage(msg.chat.id, "Вы уже выбрали какой букет желаете заказать или хотите собрать свой неповторимый букет? \nЕсли вы хотите создать свой неповторимый букет то выбирайте собрать самому, а если есть тот что вам понравился, зайдите в меню и введите код букета.",
            {
                reply_markup: {
                    keyboard: [
                        ['Собрать самому'],
                        ['Ввести код'],
                    ], resize_keyboard: true
                }
            })
    } catch (error) {
        console.log(error)
        await bot.sendMessage(msg.chat.id, "Ошибка")
    }
})
bot.sendMessage(chatId, 'Выберите цвет букета:', colorKeyboard); 
        } else { 
            bot.sendMessage(chatId, 'Подтвердите или отмените заказ:', confirmationKeyboard); 
        } 
    } 
     
    if (currentState === '') { 
        bot.sendMessage(chatId, 'Добро пожаловать в наш магазин цветов! Чтобы сделать заказ, выберите цвет букета:', colorKeyboard); 
        currentState = 'color'; 
    } else if (currentState === 'quantity') { 
        if (messageText === 'Назад') { 
            currentState = 'flowers'; 
            bot.sendMessage(chatId, Выберите цветы для ${order.color} цвета:, getFlowersKeyboard(order.color)); 
            console.log(chatId) 
        } else if (["1", "3", "5"].includes(messageText)) { 
            order.quantity = parseInt(messageText); 
            currentState = 'confirmation'; // Переходим к подтверждению заказа 
            bot.sendMessage(chatId, Подтвердите ваш заказ:\n${order.quantity} цветов ${order.flowers} ${order.color} цвета., confirmationKeyboard); 
        } else { 
            bot.sendMessage(chatId, "Пожалуйста, выберите количество цветов из предложенных вариантов.", quantityKeyboard); 
        } 
    } 
}); 
function getFlowersKeyboard(color) { 
    if (color === 'Красный') { 
        return redFlowersKeyboard; 
    } else if (color === 'Желтый') { 
        return yellowFlowersKeyboard; 
    } else if (color === 'Синий') { 
        return blueFlowersKeyboard; 
    } 
}
