import { getInfoContribute as getInfoContributeMeta3D } from "meta3d-extension-test1-protocol/src/contribute/InfoContributeType"
import { name } from "meta3d-contribute-test1-protocol"

export let getInfoContribute: getInfoContributeMeta3D = () => {
    return {
        name: name,
        info: "contribute_test1_info"
    }
}
