import { Util } from '../controllers/util';
import * as path from 'path';
import * as fs from 'fs';

export class Collection {

    private collectionName: string;
    private documentPath: string;
    constructor(entity: any) {
        this.collectionName = entity;
        this.documentPath = Util.getDocumentPath(entity);
    }

    //     collectionName = entity;
    //     documentPath = getDocumentPathSync(collectionName);
    //     return {
    //     find: find,
    //     findOne: findOne,
    //     findById: findById,
    //     findMany: findMany,
    //     save: save,
    //     update: update,
    //     delete: removeOne,
    //     deleteById: deleteById
    // }

    // /**
    //  *
    //  * @param entity entity
    //  * @param baseFolder base folder
    //  */
    // public async getFileName(entity: string, baseFolder: string): Promise<any> {

    //     let dir, fileName;

    //     try {

    //         dir = baseFolder === undefined ? entity + 's' : baseFolder.substr(1) + '/' + entity + 's';
    //         fileName = path.resolve(dir + '/' + entity + '.json');

    //         if (!fs.existsSync(fileName)) {
    //             Util.mkdir('/' + dir);
    //             //  writeDocument('{}', fileName);
    //         }

    //         return fileName;
    //     } catch (error) {
    //         throw error;
    //     }

    // }

    public async readDocument(): Promise<any> {

        try {
            const data = fs.readFileSync(this.documentPath, 'UTF8');
            return data ? JSON.parse(data) : [];
        }
        catch (error) {
            throw error;
        }

    }

    public async writeDocument(data: any): Promise<any> {

        if (typeof data !== 'string') {
            data = JSON.stringify(data);
        }
        try {
            return fs.writeFileSync(this.documentPath, data, 'utf-8');
        } catch (error) {
            throw error;
        }
    }

    public async find(): Promise<any> {

        try {
            return this.readDocument();
        } catch (error) {
            throw error;
        }

    }

    public async findOne(options: any): Promise<any> {

        if (!(typeof options === 'object' && options.length === undefined))
            throw new Error('Options are not an object');

        try {
            const fullData = await this.find();
            const matchedData = this.matchData(fullData, options, false);
            return matchedData;
        } catch (error) {
            throw error;
        }

    }

    public findById(id: any) {
        return this.findOne({ __id: id });
    }

    public async findMany(options: { [x: string]: any }): Promise<any> {

        if (!(typeof options === 'object' && options.length === undefined))
            throw new Error('Options are not an object');

        try {
            const fullData = await this.find();
            const matchedData = this.matchData(fullData, options, true);
            return matchedData;
        } catch (error) {
            throw error;
        }

    }

    public matchData(data: any[], options: { [x: string]: any; }, isMatchMany: boolean) {
        let matchedData, matchedOne;
        const matchedMany = [];

        try {

            for (let i = 0; i < data.length; i++) {
                let isMatched = false,
                    j = 0;
                for (const key in options) {
                    if (j > 0 && !isMatched) break;
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
                    } else {
                        matchedOne = [{
                            index: i,
                            data: data[i]
                        }]
                        break;
                    }
                }

            }
            matchedData = isMatchMany ? matchedMany : matchedOne;

            return matchedData;
        } catch (error) {
            throw error;
        }
    }

    public async save(data: any): Promise<any> {

        try {
            const fullData = await this.find();
            const processedData = this.processData(data, fullData);
            await this.writeDocument(processedData.fileData);
            return processedData.reqData;
        } catch (error) {
            throw error;
        }
    }

    public processData(reqData: any, fileData: any[]): any {
        try {
            reqData = this.reorderData(reqData);
            if (!Array.isArray(fileData)) fileData = [];
            fileData.push(this.reorderData(reqData));
            return {
                reqData: reqData,
                fileData: fileData
            };
        } catch (error) {
            throw error;
        }
    }

    public reorderData(data: { [x: string]: any; }) {
        const createdData: { [x: string]: any; } = {};
        createdData['__id'] = Util.rand(10);
        for (const key in data) {
            if (key != '__id') { createdData[key] = data[key]; }
        }

        return createdData;
    }

    // public update(data: any, options: { length: any; }) {

    //     if (!(typeof options === 'object' && options.length === undefined))
    //         return err(new Error('Options are not in object'));

    //     let fullData: { splice: (arg0: any, arg1: number, arg2: any) => void; }, updateIndex: any, updatedData: any;

    //     function matchOne(_data: any) {
    //         fullData = _data;
    //         return matchData(_data, options, false);
    //     }

    //     function updateData(foundData: { data: any; }[]) {
    //         try {
    //             if (!updateIndex) { return err(new Error('No Data Found To Update.')); }
    //             updateIndex = foundData[0].index;
    //             return patchData(foundData[0].data, data, options)
    //         } catch (error) {
    //             return q.reject(error);
    //         }
    //     }

    //     function writeData(data: any) {
    //         updatedData = data;
    //         fullData.splice(updateIndex, 1, data);
    //         return writeDocument(fullData, documentPath);
    //     }

    //     function sendData() {
    //         return q.resolve(updatedData);
    //     }

    //     return this.find()
    //         .then(matchOne)
    //         .then(updateData)
    //         .then(writeData)
    //         .then(sendData)
    //         .catch(err);

    // }

    // public removeOne(options: { length?: any; }) {

    //     if (!(typeof options === 'object' && options.length === undefined))
    //         return err(new Error('Options are not in object'));

    //     let fullData: { splice: (arg0: any, arg1: number) => void; }, updateIndex, updatedData;

    //     function matchOne(_data: any) {
    //         fullData = _data;
    //         return matchData(_data, options, false);
    //     }

    //     function deleteData(foundData: { index: any; }[]) {
    //         try {
    //             let index = foundData[0].index;
    //             fullData.splice(index, 1);
    //             return q.resolve(foundData)
    //         } catch (error) {
    //             return q.reject(error);
    //         }
    //     }

    //     return this.find()
    //         .then(matchOne)
    //         .then(deleteData)
    //         .catch(err);
    // }

}