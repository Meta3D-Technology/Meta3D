import { getContribute as getContributeMeta3D, state as meta3dState, api } from "meta3d-type"
import { uiControlName, state as uiControlState, inputFunc, specificData, outputData } from "meta3d-ui-control-codeedit-protocol"
import { service, uiControlContribute } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { getBeforeRenderEventName } from "meta3d-editor-event-utils/src/Main"
import { service as editorWholeService } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { eventName as selectInspectorNodeEventName } from "meta3d-action-select-inspector-node-protocol/src/EventType"
import { getRestoreEditorValueEventName } from "meta3d-editor-event-utils/src/Main"
import { getMonaco } from "meta3d-monaco-utils"

let _bindHiddenContainerEvent = (meta3dState: meta3dState, api: api, container: HTMLElement) => {
    let { onCustomGlobalEvent3 } = api.nullable.getExn(api.getPackageService<service>(meta3dState, "meta3d-editor-whole-protocol")).event(meta3dState)


    return onCustomGlobalEvent3(meta3dState, "meta3d-event-protocol", [
        getBeforeRenderEventName(), 0, (meta3dState, _) => {
            container.style.display = "none"

            return Promise.resolve(meta3dState)
        }
    ])
}

let _bindRestoreEditorValueEvent = (meta3dState: meta3dState, api: api, label: string) => {
    let { onCustomGlobalEvent2, triggerCustomGlobalEvent2, createCustomEvent } = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).event(meta3dState)

    meta3dState = onCustomGlobalEvent2(meta3dState, "meta3d-event-protocol", [
        getRestoreEditorValueEventName(),
        0,
        (meta3dState) => {
            meta3dState = api.uiControl.setUIControlState<uiControlState>(meta3dState, label, {
                ...api.nullable.getExn(api.uiControl.getUIControlState<uiControlState>(meta3dState, label)),
                isRestoreEditorValue: true
            })

            return meta3dState
        }
    ])


    meta3dState = onCustomGlobalEvent2(meta3dState, "meta3d-event-protocol", [
        selectInspectorNodeEventName,
        0,
        (meta3dState) => {
            return triggerCustomGlobalEvent2(meta3dState, "meta3d-event-protocol", createCustomEvent(getRestoreEditorValueEventName(), api.nullable.getEmpty()))
        }
    ])


    return meta3dState
}

export let getContribute: getContributeMeta3D<uiControlContribute<inputFunc, specificData, outputData>> = (api) => {
    return {
        uiControlName: uiControlName,
        func: (meta3dState,
            getInputFunc,
            _rect,
            {
                label,
                height,
            }
        ) => {
            let promise = null

            if (api.nullable.isNullable(getInputFunc)) {
                promise = Promise.resolve("")
            }
            else {
                promise = api.nullable.getExn(getInputFunc)(meta3dState)
            }

            return promise.then(code => {
                if (api.nullable.isNullable(api.uiControl.getUIControlState<uiControlState>(meta3dState, label))) {
                    let container = document.createElement("div")
                    document.body.appendChild(container)

                    container.style.position = "absolute"

                    meta3dState = api.uiControl.setUIControlState<uiControlState>(meta3dState, label, {
                        editor: null,
                        container,
                        isRestoreEditorValue: false
                    })

                    meta3dState = _bindHiddenContainerEvent(meta3dState, api, container)
                }


                let state = api.nullable.getExn(api.uiControl.getUIControlState<uiControlState>(meta3dState, label))
                let { container, editor, isRestoreEditorValue } = state


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

                container.style.display = "block"

                container.style.top = containerRect.y + "px"
                container.style.left = containerRect.x + "px"
                container.style.width = containerRect.width + "px"
                container.style.height = containerRect.height + "px"


                if (api.nullable.isNullable(editor)) {
                    let monaco = getMonaco()

                    editor = monaco.editor.create(container, {
                        model: monaco.editor.createModel(code, "typescript"),
                    })

                    meta3dState = _bindRestoreEditorValueEvent(meta3dState, api, label)

                    meta3dState = api.uiControl.setUIControlState<uiControlState>(meta3dState, label, {
                        ...state,
                        editor: api.nullable.return(editor)
                    })
                }

                if (isRestoreEditorValue) {
                    editor.setValue(code)

                    meta3dState = api.uiControl.setUIControlState<uiControlState>(meta3dState, label, {
                        ...state,
                        isRestoreEditorValue: false
                    })
                }



                meta3dState = dummy(meta3dState, containerRect.width, containerRect.height)

                let data = button(meta3dState, "提交", [100, 30])
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
