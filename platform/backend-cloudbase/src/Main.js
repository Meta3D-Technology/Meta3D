import * as BackendService from "./application_layer/common/BackendService";
import * as RegisterService from "./application_layer/user/RegisterService";
export let init = BackendService.init;
export let checkUserName = RegisterService.checkUserName;
export let registerUser = RegisterService.register;
