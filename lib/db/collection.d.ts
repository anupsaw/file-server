export declare class Collection {
    private collectionName;
    private documentPath;
    private util;
    constructor(entity: any);
    readDocument(): Promise<any>;
    writeDocument(data: any): Promise<any>;
    find(): Promise<any>;
    findOne(options: any): Promise<any>;
    findById(id: any): Promise<any>;
    findMany(options: {
        [x: string]: any;
    }): Promise<any>;
    save(data: any): Promise<any>;
    update(data: any, options: {
        [x: string]: any;
    }): Promise<any>;
    removeOne(options: {
        [x: string]: any;
    }): Promise<any>;
}
