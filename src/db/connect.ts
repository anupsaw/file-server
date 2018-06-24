import { Mongoose, Connection, ConnectionOptions } from 'mongoose';

import os from 'os';
import fs from 'fs';

import '../lib/extension';

import { DbConnectionParams } from './schema/connection';
import { settings } from '../settings';

class AppDB {

    public static connect(): Connection {

        const db = new AppDB();
        const mongoose = new Mongoose();

        const config = db.getConfig();
        try {

            mongoose.connect(config.host, db.connectionOptions(config))
                .then(_ => { console.log('success'); })
                .catch(_ => { console.log('error'); throw _; });
        } catch (error) {
            throw error;
        }
        return mongoose.connection;
    }

    private getConfig(): DbConnectionParams {
        try {
            const configFile = settings.database.config.file ? settings.database.config.file : 'db-config.json';
            const configPath = settings.database.config.path ? settings.database.config.path : os.homedir();
            const dbConfig = <DbConnectionParams>fs.readFileSync(`${configPath}/${configFile}`, 'utf8').toJsonObject();
            return dbConfig;
        } catch (error) {
            throw error;
        }
    }

    private connectionOptions(params: DbConnectionParams): ConnectionOptions {
        return <ConnectionOptions>{
            user: params.userName,
            pass: params.password,
            dbName: params.database
        };

    }
}

export const db = AppDB.connect();