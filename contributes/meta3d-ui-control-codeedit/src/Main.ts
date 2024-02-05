import { getContribute as getContributeMeta3D } from "meta3d-type"
import { uiControlName, state as uiControlState, inputFunc, specificData, outputData } from "meta3d-ui-control-codeedit-protocol"
import { service, uiControlContribute } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { windowFlags } from "meta3d-imgui-renderer-protocol/src/service/ServiceType"

export let getContribute: getContributeMeta3D<uiControlContribute<inputFunc, specificData, outputData>> = (api) => {
    return {
        uiControlName: uiControlName,
        func: (meta3dState,
            _getInputFunc,
            _rect,
            {
                label,
                initialCode
            }
        ) => {
            // TODO check: should only has one

            if (api.nullable.isNullable(api.uiControl.getUIControlState<uiControlState>(meta3dState, label))) {
                let container = document.createElement("div")
                document.body.appendChild(container)

                container.style.position = "absolute"

                meta3dState = api.uiControl.setUIControlState<uiControlState>(meta3dState, label, {
                    editor: null,
                    container
                })
            }

            let state = api.nullable.getExn(api.uiControl.getUIControlState<uiControlState>(meta3dState, label))
            let promise = null

            if (api.nullable.isNullable(state.editor)) {
                promise = import(
    /* webpackPrefetch: true */"monaco-editor/esm/vs/editor/editor.api.js"
                ).then(monaco => {
                    let editor = monaco.editor.create(state.container, {
                        model: monaco.editor.createModel(initialCode, "typescript"),
                    })

                    meta3dState = api.uiControl.setUIControlState<uiControlState>(meta3dState, label, {
                        ...state,
                        editor: api.nullable.return(editor)
                    })
                })

            }
            else {
                promise = Promise.resolve(meta3dState)
            }

            return promise.then(meta3dState => {
                let { container, editor } = api.nullable.getExn(api.uiControl.getUIControlState<uiControlState>(meta3dState, label))


                let { getItemRectMin, getWindowSize, getWindowPos, beginWindow, endWindow, button, setNextWindowRect, setCursorPos } = api.nullable.getExn(api.getPackageService<service>(meta3dState, "meta3d-editor-whole-protocol")).ui(meta3dState)

                let containerRect = {
                    x: getItemRectMin(meta3dState).x,
                    y: getItemRectMin(meta3dState).y,
                    width: getWindowSize(meta3dState).x,
                    height: getWindowSize(meta3dState).y - getItemRectMin(meta3dState).y + getWindowPos(meta3dState).y
                }

                container.style.top = containerRect.y + "px"
                container.style.left = containerRect.x + "px"
                container.style.width = containerRect.width + "px"
                container.style.height = containerRect.height + "px"


                meta3dState = setNextWindowRect(meta3dState, containerRect)

                meta3dState = beginWindow(meta3dState, label, windowFlags.NoTitleBar)
                meta3dState = endWindow(meta3dState)


                meta3dState = setCursorPos(meta3dState, [containerRect.x, containerRect.y + containerRect.height])

                let data = button(meta3dState, "提交", [100, 50])
                meta3dState = data[0]
                let isClick = data[1]

                if (isClick) {
                    return [meta3dState, api.nullable.return(editor.getValue())]
                }

                return [meta3dState, null]
            })

        },
        init: (meta3dState) => Promise.resolve(meta3dState)
    }
}
