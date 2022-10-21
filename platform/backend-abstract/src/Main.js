"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = exports.init = void 0;
const RegisterService = require("./application_layer/user/RegisterService");
let init = (init) => init();
exports.init = init;
let registerUser = (addData, username, password) => {
    return RegisterService.register(addData, username, password);
};
exports.registerUser = registerUser;
