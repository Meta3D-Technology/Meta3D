import { getComponentContribute as getComponentContributeMeta3D } from "meta3d-engine-core-protocol/src/contribute_points/scene_graph/ComponentContributeType";
import { pbrMaterial, config } from "meta3d-component-pbrmaterial-protocol";

type state = any

export let getComponentContribute: getComponentContributeMeta3D<state, config, pbrMaterial>