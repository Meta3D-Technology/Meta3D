import { getContribute as getContributeMeta3D } from "meta3d-type"
import { uiControlName, state, inputFunc, specificData, outputData } from "meta3d-ui-control-modal-protocol"
import { service, uiControlContribute } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { data } from "meta3d-input-modal-protocol"

export let getContribute: getContributeMeta3D<uiControlContribute<inputFunc, specificData, outputData>> = (api) => {
    return {
        uiControlName: uiControlName,
        func: (meta3dState,
            getInputFunc,
            rect,
            {
                label,
                childrenFunc
            }
        ) => {
            let inputPromise: Promise<data>
            if (api.nullable.isNullable(getInputFunc)) {
                inputPromise = Promise.resolve(false)
            }
            else {
                inputPromise = api.nullable.getExn(getInputFunc)(meta3dState)
            }

            return inputPromise.then(isOpen => {
                if (api.nullable.isNullable(api.uiControl.getUIControlState<state>(meta3dState, label))) {
                    meta3dState = api.uiControl.setUIControlState<state>(meta3dState, label, {
                        isOpen: false,
                    })
                }

                let { beginModal, endModal, openModal, closeCurrentModal } = api.nullable.getExn(api.getPackageService<service>(meta3dState, "meta3d-editor-whole-protocol")).ui(meta3dState)

                let state = api.nullable.getExn(api.uiControl.getUIControlState<state>(meta3dState, label))

                if (isOpen && !state.isOpen) {
                    meta3dState = openModal(meta3dState, label)

                    meta3dState = api.uiControl.setUIControlState<state>(meta3dState, label, {
                        isOpen: true,
                    })
                }
                else if (!isOpen && state.isOpen) {
                    meta3dState = closeCurrentModal(meta3dState)

                    meta3dState = api.uiControl.setUIControlState<state>(meta3dState, label, {
                        isOpen: false,
                    })
                }


                let data = beginModal(meta3dState, label)
                meta3dState = data[0]
                let isOpen_ = data[1]

                if (isOpen_) {
                    return childrenFunc(meta3dState).then(meta3dState => {
                        meta3dState = endModal(meta3dState)

                        return [meta3dState, null]
                    })
                }

                return Promise.resolve([meta3dState, null])
            })
        },
        init: (meta3dState) => Promise.resolve(meta3dState)
    }
}
