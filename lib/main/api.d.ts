import { Request, Response, Application, NextFunction } from 'express';
export declare class AppApi {
    static init(app: Application): void;
    notFound(req: Request, res: Response): void;
    handleError(err: any, req: Request, res: Response, next: NextFunction): void;
    logError(err: any, req: Request, res: Response, next: NextFunction): void;
}
