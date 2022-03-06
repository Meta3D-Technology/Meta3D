import { getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D } from "meta3d-type/src/Index"
import { state } from "wonder-log-protocol/src/state/StateType"
import { service } from "wonder-log-protocol/src/service/ServiceType"
import { dependentExtensionNameMap } from "wonder-log-protocol/src/service/DependentExtensionType"
import { infoContribute } from "wonder-log-protocol/src/contribute_points/InfoContributeType"


export let getExtensionService: getExtensionServiceMeta3D<
	dependentExtensionNameMap,
	service
> = (api, _dependentExtensionNameMap) => {
	return {
		log: ({ infos }: state) => {
			console.log("wonder-log extension->log infos:", infos)
		},
		registerInfo: (state: state, { info }: infoContribute) => {
			return {
				...state,
				infos: state.infos.concat([info])
			}
		}
	}
}

export let createExtensionState: createExtensionStateMeta3D<
	state
> = () => {
	return {
		infos: []
	}
}
