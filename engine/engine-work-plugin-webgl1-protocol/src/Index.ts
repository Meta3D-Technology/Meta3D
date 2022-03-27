import { service as mostService } from "meta3d-bs-most-protocol/src/service/ServiceType"
import { service as webgl1Service } from "meta3d-webgl1-protocol/src/service/ServiceType"
import { service as engineCoreService } from "meta3d-engine-core-protocol/src/service/ServiceType"
import { service as immutableService } from "meta3d-immutable-protocol/src/service/ServiceType"
import { map } from "meta3d-immutable-protocol/src/service/MapType";
import { nullable } from "meta3d-commonlib-ts/src/nullable";

export const workPluginName = "engine-work-plugin-webgl1"

export type verticesVBOMap = map<number, WebGLBuffer>;
export type indicesVBOMap = map<number, WebGLBuffer>;
export type programMap = map<number, WebGLProgram>;

export type state = {
    isDebug: boolean,
    mostService: mostService,
    webgl1Service: webgl1Service,
    engineCoreService: engineCoreService,
    immutableService: immutableService,
    canvas: HTMLCanvasElement,
    gl: nullable<WebGLRenderingContext>,
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
    immutableService: immutableService,
    canvas: HTMLCanvasElement
}