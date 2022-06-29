"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setEditor = exports.getEditor = void 0;
const NullableUtils_1 = require("meta3d-commonlib-ts/src/NullableUtils");
const POContainer = require("../logic_data/container/POContainer");
exports.getEditor = () => NullableUtils_1.getExn(POContainer.getCloundbase().app);
exports.setEditor = (app) => POContainer.setCloundbase(Object.assign(Object.assign({}, POContainer.getCloundbase()), { app: app }));
