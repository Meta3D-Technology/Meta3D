import { usedComponentContribute } from "meta3d-engine-core-protocol/src/state/RegisterComponentType";
import { nullable } from "meta3d-commonlib-ts/src/nullable"
import { transform } from "meta3d-component-transform-protocol";
import { geometry, state as geometryState } from "meta3d-component-geometry-protocol";
import { perspectiveCameraProjection } from "meta3d-component-perspectivecameraprojection-protocol";
import { basicCameraView } from "meta3d-component-basiccameraview-protocol";
import { directionLight } from "meta3d-component-directionlight-protocol";
import { service } from "meta3d-engine-core-protocol/src/service/ServiceType"
import { pbrMaterial, state as pbrMaterialState } from "meta3d-component-pbrmaterial-protocol/src/Index";
import { gameObject } from "meta3d-gameobject-protocol/src/Index";

export function lookAt(contribute: usedComponentContribute, engineCoreService: service, transform: transform, target: [number, number, number], up?: [number, number, number]): usedComponentContribute

export function computeTangents(vertices: Float32Array, texCoords: Float32Array, normals: Float32Array, indices: Uint32Array): Float32Array

export function createTriangleGeometry(contribute: usedComponentContribute, engineCoreService: service): [usedComponentContribute, geometry]

export function createSphereGeometry(contribute: usedComponentContribute, engineCoreService: service): [usedComponentContribute, geometry]

export function createPlaneGeometry(contribute: usedComponentContribute, engineCoreService: service): [usedComponentContribute, geometry]

export function updatePerspectiveCameraProjection(contribute: usedComponentContribute, engineCoreService: service, isDebug: boolean, cameraProjection: perspectiveCameraProjection): usedComponentContribute

export function getViewWorldToCameraMatrix(basicCameraViewContribute: usedComponentContribute, engineCoreService: service, transformContribute: usedComponentContribute, cameraView: basicCameraView): nullable<Float32Array>

export function getActiveCameraView(contribute: usedComponentContribute, engineCoreService: service, isDebug: boolean): nullable<basicCameraView>

export function getDirection(directionLightContribute: usedComponentContribute, engineCoreService: service, transformContribute: usedComponentContribute, light: directionLight): nullable<[number, number, number]>

export function setDirection(directionLightContribute: usedComponentContribute, engineCoreService: service, transformContribute: usedComponentContribute, light: directionLight, direction: [number, number, number]): usedComponentContribute

// export function isActuallyDisposePBRMateiral(pbrMaterialState: pbrMaterialState, material: pbrMaterial, gameObjects: Array<gameObject>): boolean

// export function isActuallyDisposeGeometry(geometryState: geometryState, geometry: geometry, gameObjects: Array<gameObject>): boolean