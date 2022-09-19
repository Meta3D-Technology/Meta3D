"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setCloundbase = exports.getCloundbase = void 0;
let poContainer = {
    po: ({
        cloudbase: {
            app: null
        }
    })
};
let _getPO = () => poContainer.po;
let _setPO = (po) => poContainer.po = po;
let getCloundbase = () => _getPO().cloudbase;
exports.getCloundbase = getCloundbase;
let setCloundbase = (cloudbase) => {
    _setPO(Object.assign(Object.assign({}, _getPO()), { cloudbase: cloudbase }));
};
exports.setCloundbase = setCloundbase;
