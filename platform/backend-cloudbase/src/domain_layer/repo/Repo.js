"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setBackend = exports.getBackend = void 0;
const NullableUtils_1 = require("meta3d-commonlib-ts/src/NullableUtils");
const POContainer = require("../logic_data/container/POContainer");
let getBackend = () => (0, NullableUtils_1.getExn)(POContainer.getPO().app);
exports.getBackend = getBackend;
let setBackend = (app) => POContainer.setPO(Object.assign(Object.assign({}, POContainer.getPO()), { app: app }));
exports.setBackend = setBackend;
