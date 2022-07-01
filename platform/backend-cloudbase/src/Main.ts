import * as ErrorService from "./application_layer/common/ErrorService";
import * as BackendService from "./application_layer/common/BackendService";
import * as LoginService from "./application_layer/user/LoginService";
import * as RegisterService from "./application_layer/user/RegisterService";
import * as ShopService from "./application_layer/shop/ShopService";
import { addData, getData, getFile, notHasData } from "./application_layer/cloudbase/CloudbaseService";

export let error = ErrorService.error

export let init = BackendService.init

export let checkUserName = (username: string) => {
    return RegisterService.checkUserName(notHasData, username)
}

export let registerUser = (username: string, password: string) => {
    return RegisterService.register(addData, username, password)
}

export let isLoginSuccess = (username: string, password: string) => {
    return LoginService.isLoginSuccess(notHasData, username, password)
}

export let getAllPublishExtensionProtocols = () => {
    return ShopService.getAllPublishProtocolData(
        getData,
        "publishedExtensionProtocols")
}

export let getAllPublishContributeProtocols = () => {
    return ShopService.getAllPublishProtocolData(getData, "publishedContributeProtocols")
}

export let getAllPublishExtensions = (protocolName: string, protocolVersion: string) => {
    return ShopService.getAllPublishData([getData, getFile],
        "publishedExtensions",
        protocolName, protocolVersion
    )
}

export let getAllPublishContributes = (protocolName: string, protocolVersion: string) => {
    return ShopService.getAllPublishData([getData, getFile],
        "publishedContributes",
        protocolName, protocolVersion
    )
}