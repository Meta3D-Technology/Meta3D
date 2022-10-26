"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setBackend = exports.getBackend = void 0;
// import { _getExn } from "meta3d-commonlib-ts/src/NullableUtils";
const POContainer = require("../logic_data/container/POContainer");
function _getExn(nullableValue) {
    if (nullableValue === null || nullableValue === undefined) {
        throw new Error("nullableValue should exist");
    }
    return nullableValue;
}
let getBackend = () => _getExn(POContainer.getPO().s3);
exports.getBackend = getBackend;
let setBackend = (s3) => POContainer.setPO(Object.assign(Object.assign({}, POContainer.getPO()), { s3: s3 }));
exports.setBackend = setBackend;
