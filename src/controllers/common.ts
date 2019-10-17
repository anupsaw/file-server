// import * as path from 'path';
// import * as fs from 'fs';

// export class Common {

//     public mkdir(dir: string): string {
//         return dir
//             .split('/')
//             .reduce((rootPath: string, folder: string) => {
//                 rootPath += folder + '/';
//                 const resolvedPath = path.resolve(rootPath);
//                 if (!fs.existsSync(resolvedPath)) {
//                     fs.mkdirSync(resolvedPath);

//                 }
//                 return rootPath;
//             });
//     }

//     public async readDocument(documentName: string): Promise<any> {

//         try {
//             const data = fs.readFileSync(documentName, 'UTF8');
//             return data ? JSON.parse(data) : [];
//         }
//         catch (error) {
//             throw error;
//         }

//     }

//     public async writeDocument(documentName: string, data: any): Promise<any> {

//         if (typeof data !== 'string') {
//             data = JSON.stringify(data);
//         }
//         try {
//             return fs.writeFileSync(documentName, data, 'utf-8');
//         } catch (error) {
//             throw error;
//         }
//     }

//     /**
//      *
//      * @param entity entity
//      * @param baseFolder base folder
//      */
//     public async getFileName(entity: string, baseFolder: string): Promise<any> {

//         let dir, fileName;

//         try {

//             dir = baseFolder === undefined ? entity + 's' : baseFolder.substr(1) + '/' + entity + 's';
//             fileName = path.resolve(dir + '/' + entity + '.json');

//             if (!fs.existsSync(fileName)) {
//                 this.mkdir('/' + dir);
//                 //  writeDocument('{}', fileName);
//             }

//             return fileName;
//         } catch (error) {
//             throw error;
//         }

//     }

//     public async find(): Promise<any> {

//         return this.getDocumentPath(collectionName)
//             .then(this.readDocument)
//             .catch(err);

//     }

//     public async getDocumentPath(entity: string, baseFolder?: string): Promise<any> {

//         let dir, fileName;

//         //  baseFolder = (baseFolder === undefined) ? config.appDataFolder : baseFolder;
//         baseFolder = '/';
//         try {

//             dir = baseFolder.substr(1) + '/' + entity + 's';
//             fileName = path.resolve(dir + '/' + entity + '.json');

//             if (!fs.existsSync(fileName)) {
//                 mkdir('/' + dir);
//                 writeDocument('{}', fileName);
//             }

//             return fileName;
//         } catch (error) {
//             throw error;
//         }

//     }

// }