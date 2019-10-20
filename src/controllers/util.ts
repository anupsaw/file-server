
import * as path from 'path';
import * as fs from 'fs';

const baseFolder = __dirname + '/file-db';
export class Util {

    public static create(): Util {
        return new Util();
    }

    /** Create directory */
    public mkdir(dir: string): string {

        const findAndCreate = (rootPath: string, folder: string) => {
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
    public getDocumentPath(entity: string, baseFolder?: string): string {

        let dir, fileName;

        //  baseFolder = (baseFolder === undefined) ? config.appDataFolder : baseFolder;
        baseFolder = process.cwd() + '/file-db';
        console.log(baseFolder);
        if (!fs.existsSync(baseFolder)) {
            this.mkdir(baseFolder);
        }
        try {

            dir = baseFolder + '/' + entity + 's';
            fileName = path.resolve(dir + '/' + entity + '.json');

            if (!fs.existsSync(fileName)) {
                this.mkdir('/' + dir);
                fs.writeFileSync(fileName, JSON.stringify({}), 'utf-8');
            }

            return fileName;
        } catch (error) {
            throw error;
        }

    }

    /** Get Random Id for an record */
    public rand(digits: number) {
        return Math.floor(Math.random() * parseInt('8' + '9'.repeat(digits - 1)) + parseInt('1' + '0'.repeat(digits - 1)));
    }

    /** reorder and push the data */
    public processData(reqData: any, fileData: any[]): any {
        try {
            reqData = this.reorderData(reqData);
            if (!Array.isArray(fileData)) fileData = [];
            fileData.push(reqData);
            return {
                reqData: reqData,
                fileData: fileData
            };
        } catch (error) {
            throw error;
        }
    }

    /** Reorder Data */
    public reorderData(data: { [x: string]: any; }) {
        const createdData: { [x: string]: any; } = {};
        createdData['__id'] = this.rand(10);
        for (const key in data) {
            if (key != '__id') { createdData[key] = data[key]; }
        }

        return createdData;
    }

    public matchData(data: any[], options: { [x: string]: any; }, isMatchMany: boolean) {
        let matchedData; let matchedOne: any[] = [];
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
                        }];
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

    public patchData(to: { [x: string]: any; }, from: { [x: string]: any; }, ...ignore: any[]) {

        try {
            for (const key in from) {
                if (!ignore.hasOwnProperty(key) && key != '__id') {
                    to[key] = from[key];
                }
            }
            return to;
        } catch (error) {
            throw error;
        }

    }
}