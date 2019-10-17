import { NextFunction, Router, Request, Response } from 'express';
import { Collection } from '../db/collection';

export class Put {

    public async send(req: Request, res: Response, next: NextFunction): Promise<void> {
        let id, entity;

        id = req.params.id;
        entity = req.params.entity;
        const db = new Collection(entity);
        try {

            const data = await db.update(req.body, { __id: id });
            res.send(data);
        } catch (error) {
            next();
        }
    }
}