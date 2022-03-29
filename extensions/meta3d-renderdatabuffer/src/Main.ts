import { getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D } from "meta3d-type/src/Index"
import { dependentExtensionNameMap } from "meta3d-renderdatabuffer-protocol/src/service/DependentExtensionType"
import { service } from "meta3d-renderdatabuffer-protocol/src/service/ServiceType"
import { state } from "meta3d-renderdatabuffer-protocol/src/state/StateType"

let _getStride = () => 3 * 4;

export let getExtensionService: getExtensionServiceMeta3D<
	dependentExtensionNameMap,
	service
> = (api, _) => {
	return {
		createRenderDataBufferTypeArray: (maxRenderGameObjectCount) => {
			let buffer = new SharedArrayBuffer(
				maxRenderGameObjectCount * _getStride()
			);

			return new Uint32Array(buffer);
		},
		getRenderComponents: (renderDataBufferTypeArray, index) => {
			return {
				transform: renderDataBufferTypeArray[index * 3 + 2],
				geometry: renderDataBufferTypeArray[index * 3],
				material: renderDataBufferTypeArray[index * 3 + 1]
			}

		},
		setRenderComponents: (renderDataBufferTypeArray, index, { transform, material, geometry }) => {
			renderDataBufferTypeArray[index * 3] = geometry
			renderDataBufferTypeArray[index * 3 + 1] = material
			renderDataBufferTypeArray[index * 3 + 2] = transform
		},
	}
}

export let createExtensionState: createExtensionStateMeta3D<
	state
> = () => {
	return {}
}
