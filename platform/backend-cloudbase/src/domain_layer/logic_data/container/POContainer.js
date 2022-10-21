"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setPO = exports.getPO = void 0;
let poContainer = {
    po: ({
        app: null
    })
};
let getPO = () => poContainer.po;
exports.getPO = getPO;
let setPO = (po) => poContainer.po = po;
exports.setPO = setPO;
