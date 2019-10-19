"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const baseFolder = __dirname + '/file-db';
class Util {
    static create() {
        return new Util();
    }
    /** Create directory */
    mkdir(dir) {
        const findAndCreate = (rootPath, folder) => {
            rootPath += folder + '/';
            const resolvedPath = path.resolve(rootPath);
            if (!fs.existsSync(resolvedPath)) {
                fs.mkdirSync(resolvedPath);
            }
            return rootPath;
        };
        return dir.split('/').reduce(findAndCreate);
    }
    /** get document path if not present create the document */
    getDocumentPath(entity, baseFolder) {
        let dir, fileName;
        //  baseFolder = (baseFolder === undefined) ? config.appDataFolder : baseFolder;
        baseFolder = baseFolder;
        try {
            dir = baseFolder + '/' + entity + 's';
            fileName = path.resolve(dir + '/' + entity + '.json');
            if (!fs.existsSync(fileName)) {
                this.mkdir('/' + dir);
                fs.writeFileSync(fileName, JSON.stringify({}), 'utf-8');
            }
            return fileName;
        }
        catch (error) {
            throw error;
        }
    }
    /** Get Random Id for an record */
    rand(digits) {
        return Math.floor(Math.random() * parseInt('8' + '9'.repeat(digits - 1)) + parseInt('1' + '0'.repeat(digits - 1)));
    }
    /** reorder and push the data */
    processData(reqData, fileData) {
        try {
            reqData = this.reorderData(reqData);
            if (!Array.isArray(fileData))
                fileData = [];
            fileData.push(reqData);
            return {
                reqData: reqData,
                fileData: fileData
            };
        }
        catch (error) {
            throw error;
        }
    }
    /** Reorder Data */
    reorderData(data) {
        const createdData = {};
        createdData['__id'] = this.rand(10);
        for (const key in data) {
            if (key != '__id') {
                createdData[key] = data[key];
            }
        }
        return createdData;
    }
    matchData(data, options, isMatchMany) {
        let matchedData;
        let matchedOne = [];
        const matchedMany = [];
        try {
            for (let i = 0; i < data.length; i++) {
                let isMatched = false, j = 0;
                for (const key in options) {
                    if (j > 0 && !isMatched)
                        break;
                    isMatched = false;
                    // not using === sign as to avoid data type match
                    if (options[key] == data[i][key]) {
                        isMatched = true;
                    }
                    j++;
                }
                if (isMatched) {
                    if (isMatchMany) {
                        matchedMany.push({
                            index: i,
                            data: data[i]
                        });
                    }
                    else {
                        matchedOne = [{
                                index: i,
                                data: data[i]
                            }];
                        break;
                    }
                }
            }
            matchedData = isMatchMany ? matchedMany : matchedOne;
            return matchedData;
        }
        catch (error) {
            throw error;
        }
    }
    patchData(to, from, ...ignore) {
        try {
            for (const key in from) {
                if (!ignore.hasOwnProperty(key) && key != '__id') {
                    to[key] = from[key];
                }
            }
            return to;
        }
        catch (error) {
            throw error;
        }
    }
}
exports.Util = Util;
