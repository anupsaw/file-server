export declare class Util {
    static create(): Util;
    /** Create directory */
    mkdir(dir: string): string;
    /** get document path if not present create the document */
    getDocumentPath(entity: string, baseFolder?: string): string;
    /** Get Random Id for an record */
    rand(digits: number): number;
    /** reorder and push the data */
    processData(reqData: any, fileData: any[]): any;
    /** Reorder Data */
    reorderData(data: {
        [x: string]: any;
    }): {
        [x: string]: any;
    };
    matchData(data: any[], options: {
        [x: string]: any;
    }, isMatchMany: boolean): any;
    patchData(to: {
        [x: string]: any;
    }, from: {
        [x: string]: any;
    }, ...ignore: any[]): {
        [x: string]: any;
    };
}
