import { config } from './settings';
import { Main } from './main';

export const server = Main.bootstrap().connect(config.port, config.baseUrl, config.graphQl);