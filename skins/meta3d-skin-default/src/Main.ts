import { getSkinContribute as getSkinContributeMeta3d } from "meta3d-ui-protocol/src/contribute_points/ISkin"
import { buttonStyle } from "meta3d-skin-protocol"
import { skinName } from "meta3d-skin-default-protocol"

export let getSkinContribute: getSkinContributeMeta3d<buttonStyle> = () => {
    return {
        skinName: skinName,
        button: {
            normal: {
                background_color: "blue"
            }
        }
    }
}
