import { Args } from './args';

export class Settings {

    private static instance: Settings;
    public port = 12345;
    public baseUrl = 'api';
    public baseFolder = 'file-db';

    private constructor(obj: Partial<Settings> = {}) {

        const args = process.argv.splice(2);
        const newArgs = Args.values(args);
        // const args = {};
        console.log(args);
        obj = { ...obj, ...newArgs };

        for (const key in obj) {
            if (key && this.hasOwnProperty(key) && typeof obj[key] !== 'function') {
                this[key] = obj[key];
            }
        }
        //  console.log(this);
    }

    public static create(obj: Partial<Settings> = {}): Settings {
        if (!Settings.instance) {
            Settings.instance = new Settings(obj);
        }
        return Settings.instance;
    }
}