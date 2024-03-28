const TelegramBot = require('node-telegram-bot-api');

const API_KEY_BOT = '6584920536:AAHwdvrjktGzaHWQexgar9Qq5T9sV81Y1iU';
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
