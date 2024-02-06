import { getContribute as getContributeMeta3D } from "meta3d-type"
import { uiControlName, state as uiControlState, inputFunc, specificData, outputData } from "meta3d-ui-control-codeedit-protocol"
import { service, uiControlContribute } from "meta3d-editor-whole-protocol/src/service/ServiceType"
// import { windowFlags } from "meta3d-imgui-renderer-protocol/src/service/ServiceType"

export let getContribute: getContributeMeta3D<uiControlContribute<inputFunc, specificData, outputData>> = (api) => {
    return {
        uiControlName: uiControlName,
        func: (meta3dState,
            _getInputFunc,
            _rect,
            {
                label,
                height,
                initialCode
            }
        ) => {
            // TODO check: should only has one

            if (api.nullable.isNullable(api.uiControl.getUIControlState<uiControlState>(meta3dState, label))) {
                debugger
                let container = document.createElement("div")
                document.body.appendChild(container)

                container.style.position = "absolute"

                meta3dState = api.uiControl.setUIControlState<uiControlState>(meta3dState, label, {
                    editor: null,
                    container
                })
            }


            let state = api.nullable.getExn(api.uiControl.getUIControlState<uiControlState>(meta3dState, label))
            let { container, editor } = state


            let { getItemRectMax, getItemRectSize, getWindowSize, getWindowPos, dummy, button } = api.nullable.getExn(api.getPackageService<service>(meta3dState, "meta3d-editor-whole-protocol")).ui(meta3dState)

            // console.log(getWindowBarHeight(meta3dState))
            let windowBarWidth = 20

            let containerRect = {
                x: getItemRectMax(meta3dState).x - getItemRectSize(meta3dState).x,
                y: getItemRectMax(meta3dState).y,
                width: getWindowSize(meta3dState).x - windowBarWidth,
                // height: getWindowSize(meta3dState).y - getItemRectMax(meta3dState).y + getWindowPos(meta3dState).y
                height: height
            }

            container.style.top = containerRect.y + "px"
            container.style.left = containerRect.x + "px"
            container.style.width = containerRect.width + "px"
            container.style.height = containerRect.height + "px"


            if (api.nullable.isNullable(editor)) {
                let monaco = (globalThis as any)["meta3d_monaco" as any]

                let editor = monaco.editor.create(container, {
                    model: monaco.editor.createModel(initialCode, "typescript"),
                })

                meta3dState = api.uiControl.setUIControlState<uiControlState>(meta3dState, label, {
                    ...state,
                    editor: api.nullable.return(editor)
                })
            }


            meta3dState = dummy(meta3dState, containerRect.width, containerRect.height)


            // meta3dState = setCursorPos(meta3dState, [containerRect.x, containerRect.y + containerRect.height])
            // meta3dState = setCursorPos(meta3dState, [0, containerRect.y - getWindowPos(meta3dState).y + containerRect.height])
            // meta3dState = setCursorPos(meta3dState, [0, containerRect.height])
            // meta3dState = setCursorPos(meta3dState, [0,0])


            // let data0 = button(meta3dState, "提交1", [100, 50])
            // meta3dState = data0[0]

            let data = button(meta3dState, "提交", [100, 30])
            // let data = button(meta3dState, "提交", [500, 500])
            meta3dState = data[0]
            let isClick = data[1]

            if (isClick) {
                return Promise.resolve([meta3dState, api.nullable.return(editor.getValue())])
            }

            return Promise.resolve([meta3dState, null])
        },
        init: (meta3dState) => Promise.resolve(meta3dState)
    }
}
