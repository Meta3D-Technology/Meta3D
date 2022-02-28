import { elementFunc as execFuncCore } from "meta3d-engine-core-protocol/src/contribute_points/work/WorkPluginContributeType"
import { service as mostService } from "meta3d-bs-most-protocol/src/service/ServiceType"
import { service as webgl1Service } from "meta3d-webgl1-protocol/src/service/ServiceType"

export type state = {
	mostService: mostService,
	webgl1Service: webgl1Service,
	canvas: HTMLCanvasElement,
	gl: WebGLRenderingContext | null
}

export type states = { "meta3d-work-plugin-webgl1": state }

export type config = {
	mostService: mostService,
	webgl1Service: webgl1Service,
	canvas: HTMLCanvasElement
}

export type elementFunc = execFuncCore<states>