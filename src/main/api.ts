import { Router, Request, Response, Application, NextFunction } from 'express';
import { Http } from '../controllers/http';
import { serverConfig } from '../settings/index';

export class AppApi {

    public static init(app: Application): void {
        const api = new AppApi();
        //  const router = Router();

        // api routes goes here
        app.use(serverConfig.baseUrl, Http.routes());
        //  app.use(router);
        app.use('**', api.notFound);
        app.use(api.logError);
        app.use(api.handleError);
    }

    public notFound(req: Request, res: Response): void {
        res.status(404);
        res.json(`Request api is not found.`);
    }

    public handleError(err: any, req: Request, res: Response, next: NextFunction): void {
        res.status(500);
        res.json({ error: err.message || '0000 : Unknown Error !!!' });
    }

    public logError(err: any, req: Request, res: Response, next: NextFunction): void {
        console.error(err);
        next(err);
    }
}