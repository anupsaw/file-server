import { Router, NextFunction, Request, Response } from 'express';
export declare class Http {
    static routes(): Router;
    get(req: Request, res: Response, next: NextFunction): Promise<any>;
    post(req: Request, res: Response, next: NextFunction): Promise<any>;
    put(req: Request, res: Response, next: NextFunction): Promise<any>;
    delete(req: Request, res: Response, next: NextFunction): Promise<any>;
}
