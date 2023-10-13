module.exports = class ResError extends Error {
    constructor(code, message) {
        super(message);
        this.name = 'ResError';
        this.code = code;
    }
};
