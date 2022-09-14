import { getContribute as getContributeMeta3D } from "meta3d-type"
import { skinName, buttonStyle } from "meta3d-skin-default-protocol"
import { dependentExtensionNameMap, dependentContributeNameMap } from "meta3d-skin-default-protocol/src/DependentMapType"
import { skinContribute } from "meta3d-ui-protocol/src/contribute/SkinContributeType"

export let getContribute: getContributeMeta3D<dependentExtensionNameMap, dependentContributeNameMap, skinContribute<buttonStyle>> = (_api, _dependentMapData) => {
    return {
        skinName: skinName,
        button: {
            normal: {
                background_color: "blue"
            }
        }
    }
}
