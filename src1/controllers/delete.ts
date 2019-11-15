import { NextFunction, Request, Response } from 'express';
import { Collection } from '../db/collection';

export class Delete {

    public async send(req: Request, res: Response, next: NextFunction): Promise<void> {
        let id, entity;

        id = req.params.id;
        entity = req.params.entity;
        const db = new Collection(entity);
        try {
            if (id) {
                const data = await db.removeOne({ __id: id });
                res.send(data);
            } else {
                throw new Error('Delete Id is not provided');
            }
        } catch (error) {
            next();
        }
    }
}