import { getComponentContribute as getComponentContributeMeta3D } from "meta3d-engine-core-sceneview-protocol/src/contribute/scene_graph/ComponentContributeType";
import { perspectiveCameraProjection, config } from "meta3d-component-perspectivecameraprojection-protocol";

type state = any

export let getContribute: getComponentContributeMeta3D<state, config, perspectiveCameraProjection>