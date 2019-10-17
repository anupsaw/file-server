import { Router, NextFunction, Request, Response } from 'express';
import { Post } from './post';
import { Delete } from './delete';
import { Get } from './get';
import { Put } from './put';

export class Http {

    public static routes(): Router {
        const routes = Router();
        const put = new Put();
        const remove = new Delete();

        const http = new Http();

        routes.route('/:entity').post(http.post);
        routes.route('/:entity').get(http.get);
        routes.route('/user').put(put.send);
        routes.route('/user').delete(remove.send);

        return routes;
    }

    public get(req: Request, res: Response, next: NextFunction): Promise<any> {
        const get = new Get();
        return get.send(req, res, next);
    }

    public post(req: Request, res: Response, next: NextFunction): Promise<any> {
        const post = new Post();
        return post.send(req, res, next);
    }
}