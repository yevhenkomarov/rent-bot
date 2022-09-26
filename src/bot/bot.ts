import "reflect-metadata";
import './main/MainController';
import { track } from './main/MainController';
import { DataAccessor } from "./main/storage/DataAccessor";
import { sendUpdates, startBot } from './telegramMessagingService';
import { Container, Service } from 'typedi';

// const config = getConfig('rent_tracker_');


startBot(Container.get(DataAccessor));

track()

setInterval(() => {
  track()
}, 1.8e+6);

sendUpdates();
setInterval(() => {
  sendUpdates()
}, 2.1e+6);