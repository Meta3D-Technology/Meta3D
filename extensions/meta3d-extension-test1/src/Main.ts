import { getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D } from "meta3d-type/src/Index"
import { state } from "meta3d-extension-test1-protocol/src/state/StateType"
import { service } from "meta3d-extension-test1-protocol/src/service/ServiceType"
import { dependentExtensionNameMap } from "meta3d-extension-test1-protocol/src/service/DependentExtensionType"
import { dependentContributeNameMap } from "meta3d-extension-test1-protocol/src/service/DependentContributeType"
import { infoContribute } from "meta3d-extension-test1-protocol/src/contribute/InfoContributeType"

export let getExtensionService: getExtensionServiceMeta3D<
	dependentExtensionNameMap,
	dependentContributeNameMap,
	service
> = (api, [_dependentExtensionNameMap, { meta3dTest1ContributeName }]) => {
	return {
		log: ({ infos }: state) => {
			console.log("meta3d-extension-test1 extension->log infos:", infos)
		},
		registerInfo: (state: state, meta3dState) => {
			let { getInfo } = api.getContribute<infoContribute>(meta3dState, meta3dTest1ContributeName)

			// TODO state.infos should be immutable Map
			state.infos[meta3dTest1ContributeName] = getInfo()

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
