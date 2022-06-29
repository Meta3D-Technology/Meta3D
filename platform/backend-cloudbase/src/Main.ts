import * as ErrorService from "./application_layer/common/ErrorService";
import * as BackendService from "./application_layer/common/BackendService";
import * as LoginService from "./application_layer/user/LoginService";
import * as RegisterService from "./application_layer/user/RegisterService";
import * as ShopService from "./application_layer/shop/ShopService";

export let error = ErrorService.error

export let init = BackendService.init

export let checkUserName = RegisterService.checkUserName

export let registerUser = RegisterService.register

export let isLoginSuccess = LoginService.isLoginSuccess

export let getAllPublishExtensionProtocols = ShopService.getAllPublishExtensionProtocols

export let getAllPublishContributeProtocols = ShopService.getAllPublishContributeProtocols

export let getAllPublishExtensions = ShopService.getAllPublishExtensions

export let getAllPublishContributes = ShopService.getAllPublishContributes