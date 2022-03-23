import { service as mostService } from "meta3d-bs-most-protocol/src/service/ServiceType"
import { service as webgl1Service } from "meta3d-webgl1-protocol/src/service/ServiceType"
import { service as engineCoreService } from "meta3d-engine-core-protocol/src/service/ServiceType"
import { Map } from "immutable";

export const workPluginName = "engine-work-plugin-webgl1"


export type verticesVBOMap = Map<number, WebGLBuffer>;
export type indicesVBOMap = Map<number, WebGLBuffer>;
export type programMap = Map<number, WebGLProgram>;

export type state = {
    isDebug: boolean,
    mostService: mostService,
    webgl1Service: webgl1Service,
    engineCoreService: engineCoreService,
    canvas: HTMLCanvasElement,
    gl: WebGLRenderingContext | null,
    vbo: {
        verticesVBOMap: verticesVBOMap,
        indicesVBOMap: indicesVBOMap
    },
    material: {
        programMap: programMap
    }
}

export type states = { "engine-work-plugin-webgl1": state }

export type config = {
    isDebug: boolean,
    mostService: mostService,
    webgl1Service: webgl1Service,
    engineCoreService: engineCoreService,
    canvas: HTMLCanvasElement
}