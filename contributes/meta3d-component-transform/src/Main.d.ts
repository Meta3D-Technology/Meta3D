import { getComponentContribute as getComponentContributeMeta3D } from "meta3d-engine-core-protocol/src/contribute/scene_graph/ComponentContributeType";
import { transform, config } from "meta3d-component-transform-protocol";

type state = any

export let getContribute: getComponentContributeMeta3D<state, config, transform>