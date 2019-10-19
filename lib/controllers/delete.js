"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const collection_1 = require("../db/collection");
class Delete {
    send(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let id, entity;
            id = req.params.id;
            entity = req.params.entity;
            const db = new collection_1.Collection(entity);
            try {
                if (id) {
                    const data = yield db.removeOne({ __id: id });
                    res.send(data);
                }
                else {
                    throw new Error('Delete Id is not provided');
                }
            }
            catch (error) {
                next();
            }
        });
    }
}
exports.Delete = Delete;
