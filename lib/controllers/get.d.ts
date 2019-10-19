import { NextFunction, Request, Response } from 'express';
export declare class Get {
    private db;
    send(req: Request, res: Response, next: NextFunction): Promise<void>;
}
