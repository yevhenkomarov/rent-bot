import Telegraf, { Markup } from 'telegraf';
import "reflect-metadata";

import { getConfig } from '../config/config';
import { MainController } from './main/MainController';

const request: string = "/dom/cities_districts/1?&api_key=oyYath7oUJjYJuWRajk9AJCVxvyQmEaNGJMQpv5V&lang_id=4";

const config = getConfig('rent_tracker_');
const bot = new Telegraf(config.bot_section.bot_token);
var controller = new MainController(config.bot_section.ria_token)
bot.hears('e', (ctx) =>{
(async () => {});
  // Using context shortcut
  ctx.reply(`Hello na khuy bleat ${ctx.chat?.first_name}`)
}) 
bot.launch();

bot.command('rent', (ctx) => ctx.reply('select', Markup.inlineKeyboard([
  Markup.callbackButton('квартира','квартира'),
  Markup.callbackButton('будинок', 'будинок')
]).extra()) 
    
)


bot.action('квартира', async (ctx) => {
  await ctx.reply('параметри', Markup.inlineKeyboard([
    Markup.callbackButton('Plain', 'plain'),
    Markup.callbackButton('Italic', 'italic')
  ]).extra())
})


bot.hears("r", async (ctx) => {
  Promise.resolve(controller.track());
  ctx.reply("request sent");
});