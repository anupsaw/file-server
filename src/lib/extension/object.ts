declare global {
    interface Object {
        toJsonString(): string;
    }
}
Object.prototype.toJsonString = function (): string {
    try {
        return JSON.stringify(Object(this));
    } catch (error) {
        throw error;
    }
};

export { };
