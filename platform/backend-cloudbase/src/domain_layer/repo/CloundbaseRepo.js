"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setEditor = exports.getEditor = void 0;
const NullableUtils_1 = require("meta3d-commonlib-ts/src/NullableUtils");
const POContainer = require("../logic_data/container/POContainer");
let getEditor = () => (0, NullableUtils_1.getExn)(POContainer.getCloundbase().app);
exports.getEditor = getEditor;
let setEditor = (app) => POContainer.setCloundbase(Object.assign(Object.assign({}, POContainer.getCloundbase()), { app: app }));
exports.setEditor = setEditor;
