declare global {
    interface String {
        toJsonObject(): Object;
    }
}
String.prototype.toJsonObject = function <P extends Object>(): P {
    try {
        return JSON.parse(String(this));
    } catch (error) {
        throw error;
    }
};

export { };
