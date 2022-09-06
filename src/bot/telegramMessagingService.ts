import Telegraf from "telegraf";
import { getTrackedData, track } from "./main/MainController";
import { DataAccessor } from "./main/storage/DataAccessor";

const bot = new Telegraf('1182228677:AAHIIncVSpb4XWVR4Q3n1Tr-cqVIAqkZSuA');
let chatId: number|undefined = 0;

export async function startBot(dataAccessor: DataAccessor) {
    bot.launch();
    bot.start((context) => {
        chatId = context.chat?.id;
        dataAccessor.addUserToDb(chatId ?? 0, context.chat?.first_name);
        context.reply(`Здоров ${context.chat?.first_name}. Додав тебе в свою базу даних під айді - ${context.chat?.id}`);
    })
    bot.hears('e', (ctx) => {
        (async () => { });
        ctx.reply(`Hello na khuy bleat ${ctx.chat?.first_name}`)
        setInterval(() => {
            getTrackedData().forEach(element => {
                bot.telegram.sendMessage(chatId ?? '', 'https://dom.ria.com/uk/' + element)
            });


            getTrackedData()
        }, 10000);
    })


    bot.hears("r", (ctx) => {
        track();
        ctx.reply("request sent");
    });


    bot.hears("ls", (ctx) => {
        getTrackedData().forEach(element => {
            ctx.reply('https://dom.ria.com/uk/' + element);
        });
    });
}
