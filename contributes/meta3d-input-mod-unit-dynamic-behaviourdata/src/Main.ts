import { state as meta3dState, getContribute as getContributeMeta3D, api } from "meta3d-type"
import { data } from "meta3d-input-mod-unit-dynamic-bahaviourdata-protocol"
import { service, inputContribute } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { actionName as initActionName, state as initState } from "meta3d-action-mod-unit-init-protocol"
import { getBehaviourModeData } from "meta3d-action-mod-unit-utils/src/Main"

export let getContribute: getContributeMeta3D<inputContribute<data>> = (api) => {
    return {
        inputName: "ModUnitDynamicBehaviourDataInput",
        func: (meta3dState, [modeKey]: [string]) => {
            return Promise.resolve(
                api.nullable.getWithDefault(
                    api.nullable.map((data) => {
                        let behaviourModeData = data.behaviourData[modeKey]
                        let modeData = getBehaviourModeData(api, behaviourModeData.mode)

                        return Array.from(api.immutable.createMapOfData<string, number>(behaviourModeData.values).entries()).map(([key, value]) => {
                            let { minValue, maxValue } = modeData.find(d => d.key == key)

                            return [
                                modeKey,
                                key,
                                value,
                                minValue,
                                maxValue
                            ]
                        })
                    },
                        api.action.getActionState<initState>(meta3dState, initActionName)
                    ),
                    []
                )
            )
        }
    }
}
