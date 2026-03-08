import { getContribute as getContributeMeta3D } from "meta3d-type"
import { uiControlName, state as uiControlState, inputFunc, specificData, outputData } from "meta3d-ui-control-tab-protocol"
import { service, uiControlContribute } from "meta3d-editor-whole-protocol/src/service/ServiceType"

export let getContribute: getContributeMeta3D<uiControlContribute<inputFunc, specificData, outputData>> = (api) => {
    return {
        uiControlName: uiControlName,
        func: (meta3dState,
            _,
            rect,
            {
                label,
                items,
            }
        ) => {
            let { beginTabBar, beginTabItem, endTabBar, endTabItem } = api.nullable.getExn(api.getPackageService<service>(meta3dState, "meta3d-editor-whole-protocol")).ui(meta3dState)

            let tabKey = api.nullable.getEmpty<string>()

            let data = beginTabBar(meta3dState, label)
            meta3dState = data[0]
            let isOpen_ = data[1]

            if (isOpen_) {
                [meta3dState, tabKey] = items.reduce(([meta3dState, tabKey], [text, key]) => {
                    let data = beginTabItem(meta3dState, text)
                    meta3dState = data[0]
                    let isOpen__ = data[1]

                    if (isOpen__) {
                        tabKey = api.nullable.return(key)

                        meta3dState = endTabItem(meta3dState)
                    }

                    return [meta3dState, tabKey]
                }, [meta3dState, api.nullable.getEmpty()])

                meta3dState = endTabBar(meta3dState)
            }

            return Promise.resolve([meta3dState, tabKey])
        },
        init: (meta3dState) => Promise.resolve(meta3dState)
    }
}
