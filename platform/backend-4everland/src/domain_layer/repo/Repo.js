"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setBackend = exports.getBackend = void 0;
const NullableUtils_1 = require("backend-abstract/src/utils/NullableUtils");
const POContainer = require("../logic_data/container/POContainer");
let getBackend = () => (0, NullableUtils_1.getExn)(POContainer.getPO().s3);
exports.getBackend = getBackend;
let setBackend = (s3) => POContainer.setPO(Object.assign(Object.assign({}, POContainer.getPO()), { s3: s3 }));
exports.setBackend = setBackend;
