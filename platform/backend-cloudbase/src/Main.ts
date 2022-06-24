import * as BackendService from "./application_layer/common/BackendService";
import * as LoginService from "./application_layer/user/LoginService";
import * as RegisterService from "./application_layer/user/RegisterService";

export let init = BackendService.init

export let checkUserName = RegisterService.checkUserName

export let registerUser = RegisterService.register

export let isLoginSuccess = LoginService.isLoginSuccess