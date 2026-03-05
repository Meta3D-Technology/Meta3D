import { getContribute as getContributeMeta3D } from "meta3d-type"
import { uiControlName, state as uiControlState, inputFunc, specificData, outputData } from "meta3d-ui-control-popup-protocol"
import { service, uiControlContribute } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { data } from "meta3d-input-popup-protocol"

export let getContribute: getContributeMeta3D<uiControlContribute<inputFunc, specificData, outputData>> = (api) => {
    return {
        uiControlName: uiControlName,
        func: (meta3dState,
            getInputFunc,
            _,
            {
                label,
                id,
                isShowSelectedItem
            }
        ) => {
            let inputPromise: Promise<data>
            if (api.nullable.isNullable(getInputFunc)) {
                inputPromise = Promise.resolve([])
            }
            else {
                inputPromise = api.nullable.getExn(getInputFunc)(meta3dState, [])
            }

            return inputPromise.then(selectedValues => {
                let { popup } = api.nullable.getExn(api.getPackageService<service>(meta3dState, "meta3d-editor-whole-protocol")).ui(meta3dState)

                let selectedIndex
                if (isShowSelectedItem) {
                    let state = api.nullable.getWithDefault(api.uiControl.getUIControlState<uiControlState>(meta3dState, label), {
                        lastSelectedIndex: null
                    });

                    [meta3dState, selectedIndex] = popup(meta3dState, label, selectedValues, id, api.nullable.map<number, string>(lastSelectedIndex => {
                        return selectedValues[lastSelectedIndex]
                    }, state.lastSelectedIndex))

                    // meta3dState = api.uiControl.setUIControlState(meta3dState, label, {
                    //     ...state,
                    //     lastSelectedIndex: api.nullable.bind(
                    //         _ => state.lastSelectedIndex,
                    //         selectedIndex,
                    //     )
                    // })
                    if (!api.nullable.isNullable(selectedIndex)) {
                        // debugger
                        // console.log(
                        //     api.nullable.bind(
                        //         _ => state.lastSelectedIndex,
                        //         selectedIndex,
                        //     )
                        // )
                        meta3dState = api.uiControl.setUIControlState(meta3dState, label, {
                            ...state,
                            lastSelectedIndex: selectedIndex
                        })
                    }
                }
                else {
                    [meta3dState, selectedIndex] = popup(meta3dState, label, selectedValues, id, null)
                }

                return Promise.resolve([meta3dState, selectedIndex])
            })
        },
        init: (meta3dState) => Promise.resolve(meta3dState)
    }
}
