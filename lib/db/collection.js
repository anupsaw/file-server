"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("../controllers/util");
const fs = __importStar(require("fs"));
// TODO: Remove all any;
class Collection {
    constructor(entity) {
        this.util = util_1.Util.create();
        this.collectionName = entity;
        this.documentPath = this.util.getDocumentPath(entity);
    }
    readDocument() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = fs.readFileSync(this.documentPath, 'UTF8');
                return data ? JSON.parse(data) : [];
            }
            catch (error) {
                throw error;
            }
        });
    }
    writeDocument(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof data !== 'string') {
                data = JSON.stringify(data);
            }
            try {
                return fs.writeFileSync(this.documentPath, data, 'utf-8');
            }
            catch (error) {
                throw error;
            }
        });
    }
    find() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return this.readDocument();
            }
            catch (error) {
                throw error;
            }
        });
    }
    findOne(options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(typeof options === 'object' && options.length === undefined))
                throw new Error('Options are not an object');
            try {
                const fullData = yield this.find();
                const matchedData = this.util.matchData(fullData, options, false);
                if (matchedData) {
                    return matchedData.pop().data;
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
    findById(id) {
        return this.findOne({ __id: id });
    }
    findMany(options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(typeof options === 'object' && options.length === undefined))
                throw new Error('Options are not an object');
            try {
                const fullData = yield this.find();
                const matchedData = this.util.matchData(fullData, options, true);
                return matchedData;
            }
            catch (error) {
                throw error;
            }
        });
    }
    save(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fullData = yield this.find();
                const processedData = this.util.processData(data, fullData);
                yield this.writeDocument(processedData.fileData);
                return processedData.reqData;
            }
            catch (error) {
                throw error;
            }
        });
    }
    update(data, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(typeof options === 'object' && options.length === undefined))
                throw new Error('Options are not an object');
            const fullData = yield this.find();
            const matchedData = this.util.matchData(fullData, options, false);
            if (matchedData) {
                const updateIndex = matchedData[0].index;
                const dataToUpdate = matchedData[0].data;
                const updatedData = this.util.patchData(dataToUpdate, data, options);
                fullData.splice(updateIndex, 1, updatedData);
                this.writeDocument(fullData);
                return updatedData;
            }
        });
    }
    removeOne(options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(typeof options === 'object' && options.length === undefined))
                throw new Error('Options are not an object');
            const fullData = yield this.find();
            const matchedData = this.util.matchData(fullData, options, false);
            if (matchedData) {
                const updateIndex = matchedData[0].index;
                const dataToUpdate = matchedData[0].data;
                const removedData = fullData.splice(updateIndex, 1);
                this.writeDocument(fullData);
                return removedData;
            }
        });
    }
}
exports.Collection = Collection;
//# sourceMappingURL=collection.js.map