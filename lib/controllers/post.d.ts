import { NextFunction, Request, Response } from 'express';
export declare class Post {
    send(req: Request, res: Response, next: NextFunction): Promise<void>;
}
