import Telegraf, { Context, Markup } from "telegraf";
import Container from "typedi";
import { getNewItems, getTrackedData, track } from "./main/MainController";
import { DataAccessor } from "./main/storage/DataAccessor";

const bot = new Telegraf('1182228677:AAHIIncVSpb4XWVR4Q3n1Tr-cqVIAqkZSuA');
var dataAccessor = Container.get(DataAccessor);

export async function startBot(dataAccessor: DataAccessor) {
    bot.launch();
    bot.start(async (context) => {
        const chatId = context.chat?.id;
        const addUserResult = await dataAccessor.addUserToDb(chatId ?? 0, context.chat?.first_name);
        context.reply(addUserResult);
        
    })
    bot.hears('e', (ctx) => {
        ctx.reply(`Hello na khuy bleat ${ctx.chat?.first_name}`)
    })


    bot.hears("r", (ctx) => {
        track();
        ctx.reply("request sent");
    });


    bot.hears("all", async (ctx) => {
        const links = await getTrackedData();
        
        links.forEach(element => {
            ctx.reply('https://dom.ria.com/uk/' + element.link);
        });
    });

    bot.hears("new", async (ctx) => {
        const id = ctx.chat?.id?.toString();

        if (!id) {
            return;
        }

        const result: Array<string> = await getNewItems(id);;
        
        result.forEach(element => {
            ctx.reply('https://dom.ria.com/uk/' + element);
        });
    })
}

export async function sendUpdates() {
    const usersToUpdate = await dataAccessor.getUsersToUpdate();

    if (!usersToUpdate) {
        console.log("no users to update");
        return;
    }

    for (let index = 0; index < usersToUpdate.length; index++) {
        const user = usersToUpdate[index];
        if (!user.chat_id) {
            console.log('user chat id is empty')
            return;            
        }
        const newAdvertisements = await dataAccessor.getNewItems(user.chat_id?.toString());

        if (!newAdvertisements || newAdvertisements.length == 0) {
            bot.telegram.sendMessage(user.chat_id ?? '', `${user.user_name}, на жаль нових оголошень немає`);
        }

        newAdvertisements.forEach(element => bot.telegram.sendMessage(user.chat_id ?? '', 'https://dom.ria.com/uk/' + element));
    }
}
