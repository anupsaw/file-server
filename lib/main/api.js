"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("../controllers/http");
const index_1 = require("../settings/index");
class AppApi {
    static init(app) {
        const api = new AppApi();
        //  const router = Router();
        // api routes goes here
        app.use(index_1.serverConfig.baseUrl, http_1.Http.routes());
        //  app.use(router);
        app.use('**', api.notFound);
        app.use(api.logError);
        app.use(api.handleError);
    }
    notFound(req, res) {
        res.status(404);
        res.json(`Request api is not found.`);
    }
    handleError(err, req, res, next) {
        res.status(500);
        res.json({ error: err.message || '0000 : Unknown Error !!!' });
    }
    logError(err, req, res, next) {
        console.error(err);
        next(err);
    }
}
exports.AppApi = AppApi;
