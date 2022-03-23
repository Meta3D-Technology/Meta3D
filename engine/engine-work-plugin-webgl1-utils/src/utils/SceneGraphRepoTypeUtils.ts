import { geometry } from "engine-core/src/abstract/repo/ISceneGraphRepoForJs.gen";
import { Typed_array_Float32Array_t } from "engine-core/src/shims/Js.shim";
import { Typed_array_Uint32Array_t } from "engine-core/src/shims/Js.shim";

export type toComponent = (_1: number) => geometry;

export type getVertices = (_1: geometry) => (null | undefined | Typed_array_Float32Array_t);

export type getIndices = (_1: geometry) => (null | undefined | Typed_array_Uint32Array_t);
