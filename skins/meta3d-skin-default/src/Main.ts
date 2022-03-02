import { getSkinContribute as getSkinContributeMeta3D } from "meta3d-ui-protocol/src/contribute_points/SkinContributeType"
import { buttonStyle } from "meta3d-skin-protocol"
import { skinName } from "meta3d-skin-default-protocol"

export let getSkinContribute: getSkinContributeMeta3D<buttonStyle> = () => {
    return {
        skinName: skinName,
        button: {
            normal: {
                background_color: "blue"
            }
        }
    }
}
