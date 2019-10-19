"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const settings_1 = require("./settings");
const main_1 = require("./main");
main_1.Main.bootstrap().connect(settings_1.serverConfig.port);
