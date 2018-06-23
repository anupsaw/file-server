import { Router, Request, Response, Application, NextFunction } from 'express';

export class AppApi {

    public static init(app: Application) {
        const api = new AppApi();
        const router = Router();

        // api's routes goes here

        app.use(router);
        app.use('**', api.notFound);
        app.use(api.logError);
        app.use(api.handleError);
    }

    notFound(req: Request, res: Response) {
        res.status(404);
        res.json(`Request api is not found.`);
    }

    handleError(err: any, req: Request, res: Response, next: NextFunction) {
        res.status(500);
        res.json({ error: err.message || '0000 : Unknown Error !!!' });
    }

    logError(err: any, req: Request, res: Response, next: NextFunction) {
        console.error(err);
        next(err);
    }
}