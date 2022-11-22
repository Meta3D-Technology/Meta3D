import { getContribute as getContributeMeta3D } from "meta3d-type"
import { skin } from "meta3d-skin-protocol"
import { dependentExtensionNameMap, dependentContributeNameMap } from "meta3d-skin-protocol/src/DependentMapType"
import { skinContribute } from "meta3d-ui2-protocol/src/contribute/SkinContributeType"

export let getContribute: getContributeMeta3D<dependentExtensionNameMap, dependentContributeNameMap, skinContribute<skin>> = (_api, _dependentMapData) => {
    return {
        skinName: "dark",
        skin: {
            style: "dark"
        }
    }
}
