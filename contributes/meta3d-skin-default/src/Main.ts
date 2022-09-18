import { getContribute as getContributeMeta3D } from "meta3d-type"
import { skinName, skin } from "meta3d-skin-default-protocol"
import { dependentExtensionNameMap, dependentContributeNameMap } from "meta3d-skin-default-protocol/src/DependentMapType"
import { skinContribute } from "meta3d-ui-protocol/src/contribute/SkinContributeType"

export let getContribute: getContributeMeta3D<dependentExtensionNameMap, dependentContributeNameMap, skinContribute<skin>> = (_api, _dependentMapData) => {
    return {
        skinName: skinName,
        skin: {
            button: {
                normal: {
                    background_color: [0.0, 0.0, 1.0]
                }
            }
        }
    }
}
