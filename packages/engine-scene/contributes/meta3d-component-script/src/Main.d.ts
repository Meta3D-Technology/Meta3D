import { getComponentContribute as getComponentContributeMeta3D } from "meta3d-engine-core-protocol/src/contribute/scene_graph/ComponentContributeType";
import { script, config } from "meta3d-component-script-protocol";

type state = any

export let getContribute: getComponentContributeMeta3D<state, config, script>