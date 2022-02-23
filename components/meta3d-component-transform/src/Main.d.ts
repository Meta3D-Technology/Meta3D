import { componentContribute } from "meta3d-engine-core-protocol/src/contribute_points/scene_graph/IComponentForJs.gen";
import { transform, dataName } from "meta3d-component-transform-protocol"

export type config = {
    readonly isDebug: boolean;
    readonly transformCount: number;
    readonly float9Array1: Float32Array;
    readonly float32Array1: Float32Array;
};

type state = any

export function getComponentContribute(): componentContribute<state, config, dataName, transform>