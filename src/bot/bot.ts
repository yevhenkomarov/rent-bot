import "reflect-metadata";
import { getConfig } from '../config/config';
import './main/MainController';
import { track } from './main/MainController';
import { DataAccessor } from "./main/storage/DataAccessor";
import { startBot } from './telegramMessagingService';
import { Container, Service } from 'typedi';

// const config = getConfig('rent_tracker_');


startBot(Container.get(DataAccessor));

track()

// setInterval(() => {
//   track()
// }, 60000);