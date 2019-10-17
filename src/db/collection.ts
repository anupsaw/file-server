import { Util } from '../controllers/util';
import * as path from 'path';
import * as fs from 'fs';

// TODO: Remove all any;
export class Collection {

    private collectionName: string;
    private documentPath: string;
    private util: Util;

    constructor(entity: any) {
        this.util = Util.create();
        this.collectionName = entity;
        this.documentPath = this.util.getDocumentPath(entity);
    }

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
            const matchedData = this.util.matchData(fullData, options, false);
            if (matchedData) {
                return matchedData.pop().data;
            }
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
            const matchedData = this.util.matchData(fullData, options, true);
            return matchedData;
        } catch (error) {
            throw error;
        }

    }

    public async save(data: any): Promise<any> {

        try {
            const fullData = await this.find();
            const processedData = this.util.processData(data, fullData);
            await this.writeDocument(processedData.fileData);
            return processedData.reqData;
        } catch (error) {
            throw error;
        }
    }

    public async update(data: any, options: { [x: string]: any }): Promise<any> {

        if (!(typeof options === 'object' && options.length === undefined))
            throw new Error('Options are not an object');

        const fullData = await this.find();
        const matchedData = this.util.matchData(fullData, options, false);
        if (matchedData) {
            const updateIndex = matchedData[0].index;
            const dataToUpdate = matchedData[0].data;
            const updatedData = this.util.patchData(dataToUpdate, data, options);
            fullData.splice(updateIndex, 1, updatedData);
            this.writeDocument(fullData);
            return updatedData;
        }
    }

    public async removeOne(options: { [x: string]: any }): Promise<any> {

        if (!(typeof options === 'object' && options.length === undefined))
            throw new Error('Options are not an object');

        const fullData = await this.find();
        const matchedData = this.util.matchData(fullData, options, false);
        if (matchedData) {
            const updateIndex = matchedData[0].index;
            const dataToUpdate = matchedData[0].data;
            const removedData = fullData.splice(updateIndex, 1);
            this.writeDocument(fullData);
            return removedData;
        }
    }

}