import { NextFunction, Router, Request, Response } from 'express';
import { Collection } from '../db/collection';
export class Get {

    private db: Collection;

    public async send(req: Request, res: Response, next: NextFunction): Promise<void> {

        let id, entity;

        id = req.params.id;
        entity = req.params.entity;
        this.db = new Collection(entity);
        try {

            const data = id ? await this.db.findById(id) : await this.db.find();
            res.send(data);
        } catch (error) {
            next();
        }
    }
}