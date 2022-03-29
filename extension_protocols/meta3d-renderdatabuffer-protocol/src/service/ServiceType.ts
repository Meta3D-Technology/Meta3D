import { renderDataBufferTypeArray } from "meta3d-work-plugin-renderdatabuffer-protocol";
import { transform } from "meta3d-component-transform-common-protocol"
import { geometry } from "meta3d-component-geometry-common-protocol"
import { pbrMaterial } from "meta3d-component-pbrmaterial-common-protocol"

export type renderComponentData = { transform: transform, geometry: geometry, material: pbrMaterial }

export type service = {
	createRenderDataBufferTypeArray: (maxRenderGameObjectCount: number) => renderDataBufferTypeArray,
	getRenderComponents: (renderDataBufferTypeArray: renderDataBufferTypeArray, index: number) => renderComponentData,
	setRenderComponents: (renderDataBufferTypeArray: renderDataBufferTypeArray, index: number, renderComponentData: renderComponentData) => void,
}