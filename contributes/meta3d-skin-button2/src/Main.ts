import { getContribute as getContributeMeta3D } from "meta3d-type"
import { skin } from "meta3d-skin-button-protocol"
import { dependentExtensionNameMap, dependentContributeNameMap } from "meta3d-skin-button-protocol/src/DependentMapType"
import { skinContribute } from "meta3d-ui-protocol/src/contribute/SkinContributeType"

export let getContribute: getContributeMeta3D<dependentExtensionNameMap, dependentContributeNameMap, skinContribute<skin>> = (_api, _dependentMapData) => {
    return {
        skinName: "Button2",
        skin: {
            normal: {
                background_color: [1.0, 0.0, 0.0]
            }
        }
    }
}
