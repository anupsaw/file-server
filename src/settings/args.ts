export class Args {

    public static values(args: any[]): any {
        const regex = new RegExp(/(?<=^--)\w+\(?.*|(?<=^-)\w+\(?.*/g);

        const argsObj = {};

        for (let i = 0; i < args.length; i++) {
            const arg = args[i];
            const nextArg = args[i + 1] && (args[i + 1]).match(regex) && (args[i + 1]).match(regex).pop() || args[i + 1];
            let res = arg.match(regex) && arg.match(regex).pop();
            console.log(res);
            res = res && res.split('=');
            const val = res && res[1] || nextArg || false;
            res = res && res[0];

            if (res) {
                argsObj[res] = val;
            }

        }
        return argsObj;
    }
}