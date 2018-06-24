import { settings } from './settings';
import { Main } from './main';
import './lib/extension';

Main.bootstrap().connect(settings.app.port);