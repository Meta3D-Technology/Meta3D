import { getContribute as getContributeMeta3D } from "meta3d-type"
import { skin } from "meta3d-skin-protocol"
import { dependentExtensionProtocolNameMap, dependentContributeProtocolNameMap } from "meta3d-skin-protocol/src/DependentMapType"
import { skinContribute } from "meta3d-ui-protocol/src/contribute/SkinContributeType"

export let getContribute: getContributeMeta3D<dependentExtensionProtocolNameMap, dependentContributeProtocolNameMap, skinContribute<skin>> = (_api, _dependentMapData) => {
    return {
        skinName: "dark",
        skin: {
            style: "dark"
        }
    }
}
