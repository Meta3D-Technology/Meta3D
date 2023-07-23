import { getContribute as getContributeMeta3D } from "meta3d-type"
import { skin } from "meta3d-skin-protocol"
import { skinContribute } from "meta3d-ui-protocol/src/contribute/SkinContributeType"

export let getContribute: getContributeMeta3D< skinContribute<skin>> = (_api) => {
    return {
        skinName: "dark",
        skin: {
            style: "dark"
        }
    }
}
