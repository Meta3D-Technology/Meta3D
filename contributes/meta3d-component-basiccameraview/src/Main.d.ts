import { getComponentContribute as getComponentContributeMeta3D } from "meta3d-engine-core-sceneview-protocol/src/contribute/scene_graph/ComponentContributeType";
import { basicCameraView, config } from "meta3d-component-basiccameraview-protocol";

type state = any

export let getContribute: getComponentContributeMeta3D<state, config, basicCameraView>
