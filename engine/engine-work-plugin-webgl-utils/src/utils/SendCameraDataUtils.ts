import { webgl1 } from "engine-commonlib-ts/src/dependency/webgl_1/interface/IWebGL1";
import { gameObjectRepo, gameObject, basicCameraViewRepo } from "engine-core/src/abstract/repo/ISceneGraphRepoForJs.gen";
import { programMap } from "../Type";
import { getExn } from "engine-commonlib-ts/src/NullableUtils";

export let sendCameraData = (gl: WebGLRenderingContext, programMap: programMap, webgl1: webgl1, viewMatrix: Float32Array, pMatrix: Float32Array) => {
	programMap.forEach((program) => {
		webgl1.useProgram(gl, program);

		let u_view = webgl1.getUniformLocation(gl, program, "u_view");
		let u_perspective = webgl1.getUniformLocation(gl, program, "u_projection");

		webgl1.uniformMatrix4fv(gl, u_view, viewMatrix);
		webgl1.uniformMatrix4fv(gl, u_perspective, pMatrix);
	})
}

export let getCameraView = (basicCameraViewRepo: basicCameraViewRepo) => {
	return getExn(basicCameraViewRepo.getActiveBasicCameraView());

}

export let getCameraProjection = (gameObjectRepo: gameObjectRepo, gameObject: gameObject) => {
	return getExn(gameObjectRepo.getPerspectiveCameraProjection(gameObject));
}