import Telegraf from 'telegraf';

import { getConfig } from '../config/config';
import { MainController } from './main/MainController';

const request: string = "/dom/cities_districts/1?&api_key=oyYath7oUJjYJuWRajk9AJCVxvyQmEaNGJMQpv5V&lang_id=4";

const config = getConfig('rent_tracker_');
const bot = new Telegraf(config.bot_section.bot_token);
var controller = new MainController(config.bot_section.ria_token)
bot.start((ctx) => ctx.reply('Welcome!'));
bot.hears('e', (ctx) =>{
(async () => {});
  // Using context shortcut
  ctx.reply(`Hello na khuy bleat ${ctx.chat?.first_name}`)
})
bot.launch();

bot.hears("rent", async (ctx) => {
  ctx.reply("huent");
  var pr = await Promise.resolve(controller.TrackTest());
  // (async () => { 
  //   let res = await controller.testResult;
    ctx.reply(pr);
});