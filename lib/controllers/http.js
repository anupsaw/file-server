"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const post_1 = require("./post");
const delete_1 = require("./delete");
const get_1 = require("./get");
const put_1 = require("./put");
class Http {
    static routes() {
        const routes = express_1.Router();
        const http = new Http();
        routes.route('/').get((req, res) => res.send('successful'));
        routes.route('/:entity').post(http.post);
        routes.route('/:entity').get(http.get);
        routes.route('/:entity/:id').get(http.get);
        routes.route('/:entity/:id').put(http.put);
        routes.route('/:entity/:id').delete(http.delete);
        return routes;
    }
    get(req, res, next) {
        const get = new get_1.Get();
        return get.send(req, res, next);
    }
    post(req, res, next) {
        const post = new post_1.Post();
        return post.send(req, res, next);
    }
    put(req, res, next) {
        const put = new put_1.Put();
        return put.send(req, res, next);
    }
    delete(req, res, next) {
        const remove = new delete_1.Delete();
        return remove.send(req, res, next);
    }
}
exports.Http = Http;
//# sourceMappingURL=http.js.map