import bodyParser from 'body-parser';
import cors from 'cors';
import { Application } from 'express';

// import { AppDB } from '../db/connect';
import { UserModel } from '../db/schema/user';

export class AppMiddleware {

    public static init(app: Application) {
        app.use(cors());
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));
        //  AppDB.connect();
        // UserModel.findOne()
        //     .then(_ => console.log(_))
        //     .catch(_ => console.log(_));

        const user = new UserModel({ firstName: 'Anup1', lastName: 'Saw' });
        user.save().then(_ => console.log(_))
            .catch(_ => console.log(_));
    }
}