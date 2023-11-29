import { getContribute as getContributeMeta3D, state as meta3dState } from "meta3d-type"
import { inputFunc, specificData, outputData, uiControlName, menuLabel, actionName, state } from "meta3d-ui-control-menu-protocol"
import { service, uiControlContribute } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import type { Map } from "immutable"

export let getContribute: getContributeMeta3D<uiControlContribute<inputFunc, specificData, outputData>> = (api) => {
    return {
        uiControlName: uiControlName,
        func: (meta3dState,
            _,
            rect,
            {
                label,
                items
            }
        ) => {
            let { menu } = api.nullable.getExn(api.getPackageService<service>(meta3dState, "meta3d-editor-whole-protocol")).ui(meta3dState)

            // let items: Array<[menuLabel, Record<menuLabel, string>]> = [
            //     [
            //         "编辑",
            //         {
            //             "导出事件": exportEventActionName,
            //             "导出单一事件": exportSingleEventActionName,
            //             "导入事件": importEventActionName
            //         }
            //     ],
            //     [
            //         "发布",
            //         {
            //             "本地包": publishActionName
            //         }
            //     ],
            //     [
            //         "帮助",
            //         {
            //             "关于Meta3D": jumpToLinkActionName
            //         }
            //     ],
            // ]

            let data = menu(meta3dState, items.map(([label, secondLevelData]) => [
                label,
                api.immutable.createMapOfData( secondLevelData).keySeq().toArray()
            ]), "Menu Window", rect)
            meta3dState = data[0]
            let selectItemLabel = data[1]

            if (api.nullable.isNullable(selectItemLabel)) {
                return Promise.resolve([meta3dState, null])
            }

            selectItemLabel = api.nullable.getExn(selectItemLabel)

            let actionNameMap: Map<menuLabel, actionName> = items.map(([_, secondLevelData]) => api.immutable.createMapOfData( secondLevelData)
            ).reduce((result, map) => {
                return result.concat(map)
            }, api.immutable.createMap())

            let { trigger } = api.nullable.getExn(api.getPackageService<service>(meta3dState, "meta3d-editor-whole-protocol")).event(meta3dState)

            return trigger(meta3dState, "meta3d-event-protocol", api.nullable.getExn(actionNameMap.get(selectItemLabel)), null).then(meta3dState => [meta3dState, null])
        },
        init: (meta3dState) => Promise.resolve(meta3dState)
    }
}
