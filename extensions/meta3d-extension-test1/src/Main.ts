import { getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D } from "meta3d-type/src/Index"
import { state } from "meta3d-extension-test1-protocol/src/state/StateType"
import { service } from "meta3d-extension-test1-protocol/src/service/ServiceType"
import { dependentExtensionNameMap } from "meta3d-extension-test1-protocol/src/service/DependentExtensionType"
import { infoContribute } from "meta3d-extension-test1-protocol/src/contribute/InfoContributeType"

export let getExtensionService: getExtensionServiceMeta3D<
	dependentExtensionNameMap,
	service
> = (api, _dependentExtensionNameMap) => {
	return {
		log: ({ infos }: state) => {
			console.log("meta3d-extension-test1 extension->log infos:", infos)
		},
		registerInfo: (state: state, { name, info }: infoContribute) => {
			// TODO state.infos should be immutable Map
			state.infos[name] = info

			return state
		}
	}
}

export let createExtensionState: createExtensionStateMeta3D<
	state
> = () => {
	return {
		infos: {}
	}
}
