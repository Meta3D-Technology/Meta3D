import { state as meta3dState } from "meta3d-type"
import { filter, format, htmlImageElement, material, texture, textureDataType, wrap } from "meta3d-texture-basicsource-protocol/src/state/StateType"
import { nullable } from "meta3d-commonlib-ts/src/nullable";

export type createTexture = (meta3dState: meta3dState) => [meta3dState, texture];
export type disposeTexture = (meta3dState: meta3dState, texture: texture, material: material) => meta3dState;
export type addMaterial = (meta3dState: meta3dState, texture: texture, material: material) => meta3dState;

export type getName = (meta3dState: meta3dState, texture: texture) => nullable<string>

export type setName = (meta3dState: meta3dState, texture: texture, name: string) => meta3dState

export type getWrapS = (meta3dState: meta3dState, _2: texture) => wrap;
export type setWrapS = (meta3dState: meta3dState, _2: texture, _3: wrap) => meta3dState;
export type getWrapT = (meta3dState: meta3dState, _2: texture) => wrap;
export type setWrapT = (meta3dState: meta3dState, _2: texture, _3: wrap) => meta3dState;
export type getMagFilter = (meta3dState: meta3dState, _2: texture) => filter;
export type setMagFilter = (meta3dState: meta3dState, _2: texture, _3: filter) => meta3dState;
export type getMinFilter = (meta3dState: meta3dState, _2: texture) => filter;
export type setMinFilter = (meta3dState: meta3dState, _2: texture, _3: filter) => meta3dState;
export type getFormat = (meta3dState: meta3dState, _2: texture) => format;
export type setFormat = (meta3dState: meta3dState, _2: texture, _3: format) => meta3dState;
export type getType = (meta3dState: meta3dState, _2: texture) => textureDataType;
export type setType = (meta3dState: meta3dState, _2: texture, _3: textureDataType) => meta3dState;
export type getIsNeedUpdate = (meta3dState: meta3dState, _2: texture) => boolean;
export type setIsNeedUpdate = (meta3dState: meta3dState, _2: texture, _3: boolean) => meta3dState;
export type getFlipY = (meta3dState: meta3dState, _2: texture) => boolean;
export type setFlipY = (meta3dState: meta3dState, _2: texture, _3: boolean) => meta3dState;
export type getImage = (meta3dState: meta3dState, _2: texture) => htmlImageElement;
export type setImage = (meta3dState: meta3dState, _2: texture, _3: htmlImageElement) => meta3dState
