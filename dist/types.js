"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SnowstormError = void 0;
class SnowstormError extends Error {
    constructor(message, status, code) {
        super(message);
        this.status = status;
        this.code = code;
        this.name = 'SnowstormError';
    }
}
exports.SnowstormError = SnowstormError;
//# sourceMappingURL=types.js.map