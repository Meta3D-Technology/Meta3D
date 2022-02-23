import { gameObjectContribute } from "meta3d-engine-core-protocol/src/contribute_points/scene_graph/IGameObjectForJs.gen";
import { gameObject } from "meta3d-gameobject-protocol"

type state = any

export function getGameObjectContribute(): gameObjectContribute<state, gameObject>