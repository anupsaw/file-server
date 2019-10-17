
import * as path from 'path';
import * as fs from 'fs';

export class Util {

    public static mkdir(dir: string): string {

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

    public static getDocumentPath(entity: string, baseFolder?: string): string {

        let dir, fileName;

        //  baseFolder = (baseFolder === undefined) ? config.appDataFolder : baseFolder;
        baseFolder = './file-db';
        try {

            dir = baseFolder + '/' + entity + 's';
            fileName = path.resolve(dir + '/' + entity + '.json');

            if (!fs.existsSync(fileName)) {
                Util.mkdir('/' + dir);
                fs.writeFileSync(fileName, JSON.stringify({}), 'utf-8');
            }

            return fileName;
        } catch (error) {
            throw error;
        }

    }

    public static rand(digits: number) {
        return Math.floor(Math.random() * parseInt('8' + '9'.repeat(digits - 1)) + parseInt('1' + '0'.repeat(digits - 1)));
    }
}