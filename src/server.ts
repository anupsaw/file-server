import { serverConfig } from './settings';
import { Main } from './main';

Main.bootstrap().connect(serverConfig.port);