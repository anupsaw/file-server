import express from 'express';
import { Application } from 'express';
import { AppMiddleware } from './middleware';
import { AppApi } from './api';
import { ApolloGraphQlServer } from '../graph-ql/graph-ql';

export class Main {

    constructor() { }

    public static bootstrap() {
        return new Main();
    }

    public connect(port: number = 12345, baseUrl: string, graphQl: boolean = false): void {

        const serverName = graphQl ? 'GraphQl Server' : 'HTTP Server';
        const info = () => console.info(`${serverName} started on port : ${port} with api url http://localhost:${port}/${baseUrl}`);
        const app = express();
        graphQl ? this.initGraphQlApp(app, `/${baseUrl}`) : this.initHttpApp(app);
        app.listen(port, info);
    }

    private initHttpApp(app: Application): void {
        AppMiddleware.init(app);
        AppApi.init(app);
    }

    private initGraphQlApp(app: Application, path: string): void {
        ApolloGraphQlServer.init(app, path);
    }

}