import { getContribute as getContributeMeta3D, state as meta3dState } from "meta3d-type"
import { inputData, outputData, uiControlName, state } from "meta3d-ui-control-menu-protocol"
import { service as uiService } from "meta3d-ui-protocol/src/service/ServiceType"
import { uiControlContribute } from "meta3d-ui-protocol/src/contribute/UIControlContributeType"
import { getExn, isNullable } from "meta3d-commonlib-ts/src/NullableUtils"
import { Map } from "immutable"
import { menuLabel } from "meta3d-imgui-renderer-protocol/src/service/ServiceType"
import { actionName as exportEventActionName } from "meta3d-action-export-event-protocol"
import { actionName as exportSingleEventActionName } from "meta3d-action-export-single-event-protocol"
import { actionName as importEventActionName } from "meta3d-action-import-event-protocol"
import { actionName as publishActionName } from "meta3d-action-publish-protocol"
import { service as eventService } from "meta3d-event-protocol/src/service/ServiceType"

export let getContribute: getContributeMeta3D<uiControlContribute<inputData, outputData>> = (api) => {
    return {
        uiControlName: uiControlName,
        func: (meta3dState,
            {
                rect,
                label
            }
        ) => {
            let { menu } = api.getExtensionService<uiService>(meta3dState, "meta3d-ui-protocol")

            let menuData: Array<[menuLabel, Record<menuLabel, string>]> = [
                [
                    "编辑",
                    {
                        "导出事件": exportEventActionName,
                        "导出单一事件": exportSingleEventActionName,
                        "导入事件": importEventActionName
                    }
                ],
                [
                    "发布",
                    {
                        "本地包": publishActionName
                    }
                ],
            ]

            let data = menu(meta3dState, menuData.map(([label, secondLevelData]) => [
                label,
                Map(secondLevelData).keySeq().toArray()
            ]), "Menu Window", rect)
            meta3dState = data[0]
            let selectItemLabel = data[1]

            if (isNullable(selectItemLabel)) {
                return Promise.resolve([meta3dState, null])
            }

            selectItemLabel = getExn(selectItemLabel)

            let actionNameMap: Map<menuLabel, string> = menuData.map(([_, secondLevelData]) => Map(secondLevelData)
            ).reduce((result, map) => {
                return result.concat(map)
            }, Map())

            let { trigger } = api.getExtensionService<eventService>(meta3dState, "meta3d-event-protocol")

            return trigger(meta3dState, "meta3d-event-protocol", getExn(actionNameMap.get(selectItemLabel)), null).then(meta3dState => [meta3dState, null])
        },
        init: (meta3dState) => Promise.resolve(meta3dState)
    }
}
