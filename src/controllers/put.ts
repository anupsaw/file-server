import { NextFunction, Router, Request, Response } from 'express';

export class Put {

    public async send(req: Request, res: Response, next: NextFunction): Promise<void> {
        res.send('ok');
    }
}