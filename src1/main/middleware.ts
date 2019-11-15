import bodyParser from 'body-parser';
import cors from 'cors';
import { Application } from 'express';

export class AppMiddleware {

    public static init(app: Application) {
        app.use(cors());
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));
    }
}