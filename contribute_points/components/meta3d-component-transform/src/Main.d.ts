import { getComponentContribute as getComponentContributeMeta3D } from "meta3d-engine-core-protocol/src/contribute_points/scene_graph/ComponentContributeType";
import { transform, config } from "meta3d-component-transform-protocol";

type state = any

export let getComponentContribute: getComponentContributeMeta3D<state, config, transform>