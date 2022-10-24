"use strict";
// TODO handle jest error
// import { getExn } from "meta3d-commonlib-ts/src/NullableUtils";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setBackend = exports.getBackend = void 0;
const POContainer = require("../logic_data/container/POContainer");
function _getExn(nullableValue) {
    if (nullableValue === null || nullableValue === undefined) {
        throw new Error("nullableValue should exist");
    }
    return nullableValue;
}
let getBackend = () => _getExn(POContainer.getPO().app);
exports.getBackend = getBackend;
let setBackend = (app) => POContainer.setPO(Object.assign(Object.assign({}, POContainer.getPO()), { app: app }));
exports.setBackend = setBackend;
