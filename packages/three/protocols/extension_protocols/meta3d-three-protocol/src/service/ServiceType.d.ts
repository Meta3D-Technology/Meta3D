import { state as meta3dState } from "meta3d-type"
import { service as converterService_ } from "meta3d-scenegraph-converter-three-protocol/src/service/ServiceType"
import { service as threeAPIService_ } from "meta3d-three-api-protocol/src/service/ServiceType"

export type converterService = converterService_

export type threeAPIService = threeAPIService_

export type service = {
	converter: (meta3dState: meta3dState) => converterService,
	api: (meta3dState: meta3dState) => threeAPIService,
}
