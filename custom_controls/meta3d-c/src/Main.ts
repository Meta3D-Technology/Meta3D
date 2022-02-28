import { getSkinContribute as getSkinContributeMeta3d } from "../../../extension_protocols/meta3d-ui-protocol/src/contribute_points/SkinContributeType"
import { buttonStyle } from "meta3d-skin-protocol"

export let getSkinContribute: getSkinContributeMeta3d<buttonStyle> = () => {
    return {
        skinName: "meta3d-skin1",
        button: {
            normal: {
                background_color: "blue"
            }
        }
    }
}
