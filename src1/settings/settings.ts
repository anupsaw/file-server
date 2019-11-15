import { Args } from './args';
import fs from 'fs';
export class Settings {

    private static instance: Settings;
    public port = 12345;
    public baseUrl = 'api';
    public baseFolder = 'file-db';
    public configuration = `${process.cwd()}/server-config.json`;

    private constructor(obj: Partial<Settings> = {}) {
        const args = Args.values(process.argv.splice(2));
        let settings = fs.existsSync(args.configuration || this.configuration) && fs.readFileSync(args.configuration || this.configuration, 'utf-8') || {};
        settings = (typeof settings === 'string') ? JSON.parse(settings) : settings;
        obj = { ...obj, ...settings, ...args };

        console.log(obj);
        for (const key in obj) {
            if (key && this.hasOwnProperty(key) && typeof obj[key] !== 'function') {
                this[key] = obj[key];
            }
        }
    }

    public static create(obj: Partial<Settings> = {}): Settings {
        if (!Settings.instance) {
            Settings.instance = new Settings(obj);
        }
        return Settings.instance;
    }
}