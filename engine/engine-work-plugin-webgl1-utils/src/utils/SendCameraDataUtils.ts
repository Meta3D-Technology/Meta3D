// import { programMap } from "../Type";
import { state as engineCoreState } from "meta3d-engine-core-protocol/src/state/StateType"
import { service as engineCoreService } from "meta3d-engine-core-protocol/src/service/ServiceType"
import { componentName as perspectiveCameraProjectionComponentName, perspectiveCameraProjection } from "meta3d-component-perspectivecameraprojection-protocol";
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils";
import { getActiveCameraView } from "meta3d-component-commonlib";
import { componentName as basicCameraViewComponentName } from "meta3d-component-basiccameraview-protocol";
import { gameObject } from "meta3d-gameobject-protocol";
// import { service as webgl1Service } from "meta3d-webgl1-protocol/src/service/ServiceType"

// export let sendCameraData = (webgl1Service: webgl1Service, gl: WebGLRenderingContext, programMap: programMap, viewMatrix: Float32Array, pMatrix: Float32Array) => {
// 	programMap.forEach((program) => {
// 		webgl1Service.useProgram(gl, program);

// 		let u_view = webgl1Service.getUniformLocation(gl, program, "u_view");
// 		let u_perspective = webgl1Service.getUniformLocation(gl, program, "u_projection");

// 		webgl1Service.uniformMatrix4fv(gl, u_view, viewMatrix);
// 		webgl1Service.uniformMatrix4fv(gl, u_perspective, pMatrix);
// 	})
// }

export let getCameraView = (engineCoreState: engineCoreState, engineCoreService: engineCoreService, isDebug: boolean) => {
	return getExn(getActiveCameraView(engineCoreService.unsafeGetUsedComponentContribute(engineCoreState, basicCameraViewComponentName), engineCoreService, isDebug))

}

export let getCameraProjection = (engineCoreState: engineCoreState, engineCoreService: engineCoreService, gameObject: gameObject) => {
	return getExn(engineCoreService.getComponent<perspectiveCameraProjection>(engineCoreService.unsafeGetUsedComponentContribute(engineCoreState, perspectiveCameraProjectionComponentName), gameObject))
}