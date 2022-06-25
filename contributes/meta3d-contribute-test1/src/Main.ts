import { infoContribute } from "meta3d-extension-test1-protocol/src/contribute/InfoContributeType"
import { getContribute as getContributeMeta3D } from "meta3d-type"
import { dependentExtensionNameMap, dependentContributeNameMap } from "meta3d-contribute-test1-protocol/src/DependentMapType"

export let getContribute: getContributeMeta3D<dependentExtensionNameMap, dependentContributeNameMap, infoContribute> = (_api, _dependentMapData) => {
    return {
        getInfo: () => {
            console.log(_api, _dependentMapData)

            return "contribute_test1_info"
        }
    }
}
