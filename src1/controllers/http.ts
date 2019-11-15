import { Router, NextFunction, Request, Response } from 'express';
import { Post } from './post';
import { Delete } from './delete';
import { Get } from './get';
import { Put } from './put';

export class Http {

    public static routes(): Router {
        const routes = Router();

        const http = new Http();
        routes.route('/').get((req: Request, res: Response) => res.send('successful'));
        routes.route('/:entity').post(http.post);
        routes.route('/:entity').get(http.get);
        routes.route('/:entity/:id').get(http.get);
        routes.route('/:entity/:id').put(http.put);
        routes.route('/:entity/:id').delete(http.delete);

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

    public put(req: Request, res: Response, next: NextFunction): Promise<any> {
        const put = new Put();
        return put.send(req, res, next);
    }

    public delete(req: Request, res: Response, next: NextFunction): Promise<any> {
        const remove = new Delete();
        return remove.send(req, res, next);
    }
}