import * as ErrorService from "./application_layer/common/ErrorService";
import * as BackendService from "./application_layer/common/BackendService";
import * as LoginService from "./application_layer/user/LoginService";
import * as RegisterService from "./application_layer/user/RegisterService";
import * as ShopService from "./application_layer/shop/ShopService";
import * as PublishAppService from "./application_layer/publish/PublishAppService";
import { addData, getCollection, getData, getFile, hasData, notHasData, updateData, uploadFile } from "./application_layer/cloudbase/CloudbaseService";

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
        getCollection,
        "publishedExtensionProtocols")
}

export let getAllPublishContributeProtocols = () => {
    return ShopService.getAllPublishProtocolData(getCollection, "publishedContributeProtocols")
}

export let getAllPublishContributeProtocolConfigs = () => {
    return ShopService.getAllPublishProtocolConfigData(getCollection, "publishedContributeProtocolConfigs")
}


export let getAllPublishExtensions = (protocolName: string, protocolVersion: string) => {
    return ShopService.getAllPublishData([getCollection, getFile],
        "publishedExtensions",
        protocolName, protocolVersion
    )
}

export let getAllPublishContributes = (protocolName: string, protocolVersion: string) => {
    return ShopService.getAllPublishData([getCollection, getFile],
        "publishedContributes",
        protocolName, protocolVersion
    )
}

export let publishApp =
    (appBinaryFile: ArrayBuffer, appName: string, username: string) => {
        return PublishAppService.publish(
            [
                console.log,
                uploadFile,
                hasData,
                addData,
                updateData
            ],
            appBinaryFile, appName, username
        )
    }

export let findPublishApp = (username: string, appName: string) => {
    return PublishAppService.findPublishApp(
        [getData, getFile],
        username, appName
    )
}

export let findAllPublishApps = (username: string) => {
    return PublishAppService.findAllPublishApps(
        [getData, getFile],
        username
    )
}