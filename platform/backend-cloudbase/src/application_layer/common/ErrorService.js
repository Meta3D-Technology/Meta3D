"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showCatchedErrorMessage = exports.error = void 0;
exports.error = (message, e, duration = 10) => {
    console.error(e);
    message.error(e.message, duration);
};
exports.showCatchedErrorMessage = (message, func, duration = 10) => {
    try {
        func();
    }
    catch (e) {
        exports.error(message, e, duration);
    }
};
