// let express = require('express')
// let fs = require('fs');
// let path = require('path');
// let q = require('q');
// let config = {};

// let _id: any, _entity, baseFolder, collectionName: any, _isMatchMany;

// /**
//  * get FileName  using entity
//  */
// function getFileName(entity: string, baseFolder: { substr: (arg0: number) => string; }) {

//     let _dir, _fileName;

//     try {

//         _dir = baseFolder === undefined ? entity + 's' : baseFolder.substr(1) + '/' + entity + 's';
//         _fileName = path.resolve(_dir + '/' + entity + '.json');

//         if (!fs.existsSync(_fileName)) {
//             mkdir('/' + _dir);
//             writeDocument('{}', _fileName);
//         }

//         return q.resolve(_fileName);
//     } catch (error) {
//         return q.reject(error);
//     }

// }

// /**
//  * after read process file data.
//  */
// function processFile(res: { data: string; file: any; }) {
//     let _res, _id;
//     try {
//         _res = JSON.parse(res.data);
//         _id = getId();
//         if (_id !== undefined) {
//             _res = getDataById(_id, data);
//         }
//         _res = getFormatedData(res.file, _res);
//     } catch (error) {
//         return q.reject(error);
//     }

//     return q.resolve(_res);
// }

// /**
//  * make deep directory 
//  */

// function mkdir(dir: string) {
//     return dir
//         .split('/')
//         .reduce(function (rpath: string, folder: string) {
//             rpath += folder + '/';
//             let _path = path.resolve(rpath)
//             if (!fs.existsSync(_path)) {
//                 fs.mkdirSync(_path);

//             }
//             return rpath;
//         });
// }

// /**
//  * get data by Id from array of data
//  */

// function getDataById(id: string, data: { find: (arg0: (item: any) => boolean) => void; }) {
//     let res;
//     res = data.find(function (item: { id: any; }) {
//         return item.id == id;
//     });

//     if (!res) res = new Error("No data found for id " + id + ".")

//     return res;

// }

// function setId(id: any) {
//     _id = id;
// }

// function setEntity(entity: any) {
//     _entity = entity;
// }

// function getId() {
//     return _id;
// }

// /**
//  * get formated data
//  */

// function getFormatedData(file: any, data: any) {

//     return {
//         file: file,
//         data: data
//     }

// }

// /**
//  * read data for entity and id
//  */

// function readData(entity: any, id: any, baseFolder: any) {

//     setId(id);
//     setEntity(entity);

//     if (!baseFolder) baseFolder = config.appDataFolder;

//     return getFileName(entity, baseFolder)
//         .then(readFile)
//         .then(processFile)
//         .catch(logError);

// }

// /**
//  * new api from here
//  */

// /**
//  * get file name Sync
//  */

// function getDocumentPathSync(entity: string, baseFolder: { substr: (arg0: number) => string; }) {

//     let _dir, _fileName;

//     baseFolder = (baseFolder === undefined) ? config.appDataFolder : baseFolder;

//     try {

//         _dir = baseFolder.substr(1) + '/' + entity + 's';
//         _fileName = path.resolve(_dir + '/' + entity + '.json');

//         if (!fs.existsSync(_fileName)) {
//             mkdir('/' + _dir);
//             writeDocument('{}', _fileName);
//         }

//         return _fileName;
//     } catch (error) {
//         throw error;
//     }

// }

// /**
//  * get file path async;
//  */

// function getDocumentpath(entity: any, baseFolder: undefined) {
//     try {

//         let filePath = getDocumentPathSync(entity, baseFolder);
//         return q.resolve(filePath);

//     } catch (error) {
//         return q.reject(error);
//     }

// }

// /**
//  * async file read.
//  */
// function readDocument(documentName: any) {

//     try {
//         let data = fs.readFileSync(documentName, 'UTF8')
//         let newData = data ? JSON.parse(data) : [];
//         return q.resolve(newData);
//     }
//     catch (error) {
//         return q.reject(error);
//     }
// }

// /**
//  * aync file write
//  * data : date to be written
//  * entity : data to be written for the entity
//  * file :  if data need to be written on specific file in that case entity must be null
//  */

// function writeDocument(data: string, documentName: any) {

//     if (typeof data !== 'string') {
//         data = JSON.stringify(data);
//     }

//     //return getFileName(entity, baseFolder).then(function (file) {
//     return fs.writeFileSync(documentName, data, 'utf-8');
//     //})

//     //return fs.writeFile(file, data, 'utf-8');

// }

// function matchDataSync(data: any[] | { index: number; data: any; }[], options: { [x: string]: any; }, isMatchMany: any) {
//     let matchedData = null,
//         matchedOne = null,
//         matchedMany = [];

//     try {

//         for (let i = 0; i < data.length; i++) {
//             let isMatched = false,
//                 j = 0;
//             for (let key in options) {
//                 if (j > 0 && !isMatched) break;
//                 isMatched = false;

//                 //not using === sign as to avoid data type match
//                 if (options[key] == data[i][key]) {
//                     isMatched = true;
//                 }
//                 j++;
//             }
//             if (isMatched) {
//                 if (isMatchMany) {
//                     matchedMany.push({
//                         index: i,
//                         data: data[i]
//                     });
//                 } else {
//                     matchedOne = [{
//                         index: i,
//                         data: data[i]
//                     }]
//                     break;
//                 }
//             }

//         }
//         matchedData = isMatchMany ? matchedMany : matchedOne;

//         return matchedData;
//     } catch (error) {
//         throw error;
//     }
// }

// function matchData(data: any, options: any, isMatchMany: boolean) {

//     try {
//         let data = matchDataSync(data, options, isMatchMany);
//         return q.resolve(data);
//     } catch (error) {
//         return err(error);
//     }

// }

// function extractData(data: { data: any; }[]) {
//     let extractedData;
//     try {
//         if (Array.isArray(data)) {
//             extractedData = data.map(function (item) {
//                 return item.data;
//             })
//         } else {
//             extractedData = data[0].data;
//         }
//         return q.resolve(extractedData);
//     } catch (error) {
//         return err(error);
//     }

// }

// function rand(digits: number) {
//     return Math.floor(Math.random() * parseInt('8' + '9'.repeat(digits - 1)) + parseInt('1' + '0'.repeat(digits - 1)));
// }

// function patchDataSync(to: { [x: string]: any; }, from: { [x: string]: any; }, ignore: { hasOwnProperty: (arg0: string) => void; }) {

//     try {
//         for (let key in from) {
//             if (!ignore.hasOwnProperty(key) && key != '__id') {
//                 to[key] = from[key];
//             }
//         }

//         return to;
//     } catch (error) {
//         throw error;
//     }

// }

// function patchData(to: any, from: any, ignore: any) {

//     try {
//         let patchedData = patchDataSync(to, from, ignore);
//         return q.resolve(patchedData);
//     } catch (error) {
//         return q.reject(error);
//     }

// }

// function processData(reqData: {}, fileData: any[] | {}[]) {
//     try {
//         reqData = reorderData(reqData);
//         if (!Array.isArray(fileData)) fileData = [];
//         fileData.push(reorderData(reqData))
//         return q.resolve({
//             reqData: reqData,
//             fileData: fileData
//         });
//     } catch (error) {
//         return err(error);
//     }
// }

// function reorderData(data: { [x: string]: any; }) {
//     let _createdData = {};
//     _createdData['__id'] = rand(10);
//     for (let key in data) {
//         if (key != "__id") _createdData[key] = data[key];
//     }

//     return _createdData;
// }

// function validateObject(data: { length: any; }) {
//     if (!(typeof data === 'object' && data.length === undefined)) {
//         return new Error('Options are not in object');
//     } else {
//         return true;
//     }

// }

// /**
//  * return async Error
//  */
// function err(err: Error) {
//     return q.reject(err);
// }

// function collection(entity: any) {
//     collectionName = entity;
//     documentPath = getDocumentPathSync(collectionName);
//     return {
//         find: find,
//         findOne: findOne,
//         findById: findById,
//         findMany: findMany,
//         save: save,
//         update: update,
//         delete: removeOne,
//         deleteById: deleteById
//     }

//     function find() {

//         return getDocumentpath(collectionName)
//             .then(readDocument)
//             .catch(err);

//     }

//     function findOne(options: { length?: any; }) {

//         if (!(typeof options === 'object' && options.length === undefined))
//             return err(new Error('Options are not in object'));

//         function matchOne(data: any) {
//             return matchData(data, options, false);
//         }
//         return find()
//             .then(matchOne)
//             .then(extractData)
//             .catch(err);

//     }

//     function findById(id: any) {
//         return findOne({ __id: id });
//     }

//     function findMany(options: { length: any; }) {

//         if (!(typeof options === 'object' && options.length === undefined))
//             return err(new Error('Options are not in object'));

//         function matchMany(data: any) {
//             fullData = data;
//             return matchData(data, options, true);
//         }

//         return find()
//             .then(matchMany)
//             .catch(err);
//     }

//     function save(data: any) {

//         let savedData: any = null;

//         function pushToMainData(fileData: any) {
//             return processData(data, fileData);
//         }

//         function sendData() {
//             return q.resolve(savedData);
//         }

//         function writeOnFile(processedData: { reqData: any; fileData: any; }) {
//             savedData = processedData.reqData;
//             return writeDocument(processedData.fileData, documentPath)
//         }

//         return find()
//             .then(pushToMainData)
//             .then(writeOnFile)
//             .then(sendData)
//             .catch(err);
//     }

//     function update(data: any, options: { length: any; }) {

//         if (!(typeof options === 'object' && options.length === undefined))
//             return err(new Error('Options are not in object'));

//         let fullData: { splice: (arg0: any, arg1: number, arg2: any) => void; }, updateIndex: any, updatedData: any;

//         function matchOne(_data: any) {
//             fullData = _data;
//             return matchData(_data, options, false);
//         }

//         function updateData(foundData: { data: any; }[]) {
//             try {
//                 if (!updateIndex) { return err(new Error('No Data Found To Update.')); }
//                 updateIndex = foundData[0].index;
//                 return patchData(foundData[0].data, data, options)
//             } catch (error) {
//                 return q.reject(error);
//             }
//         }

//         function writeData(data: any) {
//             updatedData = data;
//             fullData.splice(updateIndex, 1, data);
//             return writeDocument(fullData, documentPath);
//         }

//         function sendData() {
//             return q.resolve(updatedData);
//         }

//         return find()
//             .then(matchOne)
//             .then(updateData)
//             .then(writeData)
//             .then(sendData)
//             .catch(err);

//     }

//     function removeOne(options: { length?: any; }) {

//         if (!(typeof options === 'object' && options.length === undefined))
//             return err(new Error('Options are not in object'));

//         let fullData: { splice: (arg0: any, arg1: number) => void; }, updateIndex, updatedData;

//         function matchOne(_data: any) {
//             fullData = _data;
//             return matchData(_data, options, false);
//         }

//         function deleteData(foundData: { index: any; }[]) {
//             try {
//                 let index = foundData[0].index;
//                 fullData.splice(index, 1);
//                 return q.resolve(foundData)
//             } catch (error) {
//                 return q.reject(error);
//             }
//         }

//         return find()
//             .then(matchOne)
//             .then(deleteData)
//             .catch(err);
//     }

//     function deleteById(id: any) {

//         return removeOne({ __id: id });
//     }

// }

// /**
//  * log error on log file
//  */

// function log(error: { message: any; stack: any; }, entity: any, req: { method: any; url: any; body: any; params: any; queryString: any; }) {

//     let err = JSON.stringify({
//         entity: entity,
//         message: error.message,
//         stack: error.stack,
//         method: req.method,
//         url: req.url,
//         body: req.body,
//         params: req.params,
//         queryString: req.queryString,
//         timeStamp: new Date()
//     });

//     let writeOnFile = getDocumentPathSync('log', config.logErrorFolder)
//     readDocument(writeOnFile)
//         .then(
//             function (fullLog: any[] | string[]) {
//                 if (!Array.isArray(fullLog)) fullLog = [];
//                 fullLog.push((err))
//                 writeDocument(fullLog, writeOnFile);
//             }
//         ).catch(function (err: any) {
//             console.error(err);
//         })

// }

// /**
//  * export methods
//  */

// module.exports = {
//     collection: collection,
//     log: log
// };