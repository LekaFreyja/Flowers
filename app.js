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

bot.on('text', async msg => {

    //const chatId = msg.chat.id;
    //if(msg.chat.id ii msg.from.id ii msg.chat.id) {
    //    bot.getChat().then()
    //}

    try {

        let word = msg.text
        switch (word) {
            case '/my':
            case '/keyb':
            case '/code':
            case 'Собрать самому':
                handleBackButton(word, latest)

                console.log(word)
                break;
            default:
                console.log(word + ' ' + 'Не записано')
        }
        if (latest.length > 4) {
            latest.unshift()
        } else {
            console.log(latest)
        }
        let lastindex = latest.length
        if(latest.length <= 1) {
            lastindex = 0;
        }else {
            lastindex = latest.length - 2
        }
        

        switch (msg.text) { 
            case '/my':
            case 'Собрать самому':
        await bot.sendMessage(msg.chat.id, "Давайте собирать.")
        await bot.sendMessage(msg.chat.id, "Выберите цвет.", {
            reply_markup: {
                keyboard: [
                    ['Розовый'],
                    ['Сиреневый'],
                    ['Красный'],
                    ['Синий'],
                    ['Зелёный'],
                    ['Голубой'],
                    ['Назад']
                ], resize_keyboard: true
            }
        })
        break;
            case '/code':
            case 'Ввести код':
        const rk = {
            reply_markup: {
                remove_keyboard: true
            }
        }
        await bot.sendMessage(msg.chat.id, "Введите код.", rk)
        break;
        case 'Назад':
            const userId = msg.from.id
            bot.processUpdate({message:{text: latest[lastindex],chat:{id:userId}}})
            break;
    }

        console.log(msg);

} catch (error) {
    console.log(error)
    await bot.sendMessage(msg.chat.id, "Ошибка")
}
})

//start идет вопрос про срочность запоминает ответ
// то что сейчас есть в старт без изменений
//всё как есть, запоминает все
//если выбрали ввести код поиск в базе, должен быть доступ к нему ещё и у админов
//высылает клиенту заказ на подтверждение, если верно оплата и разшифрованое админам
//после цвета идет выбор: сладкий или цветочный, какие цветы или (если выбрали сладкий) сладости по отдельности и зависит от выбора, далее их количество, если цветы
//сохраненое показывает для проверки клиентом
// на клавиатуре появляются команды, чтобы если что-то не так исправить и подтверждение вправильности
// возможность ввести код купона и проверка его
//далее перекидывает на оплату
//после подтверждения скидывает админам все детали заказа
