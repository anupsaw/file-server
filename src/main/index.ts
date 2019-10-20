import express from 'express';
import { Application } from 'express';
import { AppMiddleware } from './middleware';
import { AppApi } from './api';

export class Main {

    private app: Application;

    constructor() {
        this.app = express();
        this.init(this.app);
    }

    public static bootstrap() {
        return new Main();
    }

    connect(port: number = 12345, baseUrl: string) {
        const info = () => console.info(`server stated on port : ${port} with api url http://localhost:${port}/${baseUrl}`);
        this.app.listen(port, info);
    }

    private init(app: Application) {
        AppMiddleware.init(app);
        AppApi.init(app);
    }

}