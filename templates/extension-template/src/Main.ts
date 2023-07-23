import { getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D, getExtensionLife as getLifeMeta3D } from "meta3d-type"
import { state } from "your-protocol/src/state/StateType"
import { service } from "your-protocol/src/service/ServiceType"

//获得扩展提供的服务，需要返回协议的service类型
export let getExtensionService: getExtensionServiceMeta3D<
	service
> = (api) => {
	return {
		TODO
	}
}

//创建扩展的数据，需要返回协议的state类型
export let createExtensionState: createExtensionStateMeta3D<
	state
> = () => {
	return {
		TODO
	}
}

//获得扩展的生命周期的钩子函数
export let getExtensionLife: getLifeMeta3D<service> = (api, extensionProtocolName) => {
	return {
		TODO
	}
}
