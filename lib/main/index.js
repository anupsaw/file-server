"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middleware_1 = require("./middleware");
const api_1 = require("./api");
class Main {
    constructor() {
        this.app = express_1.default();
        this.init(this.app);
    }
    static bootstrap() {
        return new Main();
    }
    connect(port = 12345, baseUrl) {
        const info = () => console.info(`server stated on port : ${port} with api url http://localhost:${port}/${baseUrl}`);
        this.app.listen(port, info);
    }
    init(app) {
        middleware_1.AppMiddleware.init(app);
        api_1.AppApi.init(app);
    }
}
exports.Main = Main;
//# sourceMappingURL=index.js.map