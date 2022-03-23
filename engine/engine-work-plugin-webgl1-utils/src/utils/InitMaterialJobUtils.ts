import { createProgram, setProgram } from "../services/MaterialDoService";
import { programMap } from "../Type";
import { getFragGLSL, getVertGLSL } from "../services/GLSLService";
import { service as webgl1Service } from "meta3d-webgl1-protocol/src/service/ServiceType"

export let initMaterialUtils = (webgl1Service: webgl1Service, gl: WebGLRenderingContext, programMap: programMap, allMaterialIndices: number[]) => {
	let vertexShaderSource = getVertGLSL();
	let fragmentShaderSource = getFragGLSL();

	return allMaterialIndices.reduce((programMap, materialIndex) => {
		let program = createProgram(webgl1Service, gl, vertexShaderSource, fragmentShaderSource);

		return setProgram(programMap, materialIndex, program);
	}, programMap);

};