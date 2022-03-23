import { createProgram, setProgram } from "../services/MaterialDoService";
import { programMap } from "../Type";
import { getFragGLSL, getVertGLSL } from "../services/GLSLService";

export let initMaterialUtils = (gl: WebGLRenderingContext, programMap: programMap, allMaterialIndices: number[]) => {
	let vertexShaderSource = getVertGLSL();
	let fragmentShaderSource = getFragGLSL();

	return allMaterialIndices.reduce((programMap, materialIndex) => {

		let program = createProgram(gl, vertexShaderSource, fragmentShaderSource);

		return setProgram(programMap, materialIndex, program);
	}, programMap);

};