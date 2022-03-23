import { pipe } from "engine-fp/src/Pipe";
import { getExn } from "engine-commonlib-ts/src/NullableUtils";

export type canvas = {
	getContext(type: string):WebGLRenderingContext;
};

function _getContext(canvas: canvas) {
	return canvas.getContext("webgl");
}

export let createGL = pipe<canvas | null, canvas, WebGLRenderingContext | null, WebGLRenderingContext>(
	getExn,
	_getContext,
	getExn
);