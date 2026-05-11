import { state as meta3dState, getContribute as getContributeMeta3D, api } from "meta3d-type"
import { data } from "meta3d-input-mod-get-multi-layer-value-protocol"
import { service, inputContribute } from "meta3d-editor-whole-protocol/src/service/ServiceType"

export let getContribute: getContributeMeta3D<inputContribute<data>> = (api) => {
    return {
        inputName: "ModGetMultiLayerValueInput",
        func: (meta3dState, [initActionName, layer1FieldName, layer2FieldName, layer3FieldName]) => {
            return Promise.resolve(
                api.nullable.getWithDefault(
                    api.nullable.map((data) => {
                        let result = data[layer1FieldName]

                        if (!api.nullable.isNullable(layer2FieldName)) {
                            result = result[layer2FieldName]
                        }
                        if (!api.nullable.isNullable(layer3FieldName)) {
                            result = result[layer3FieldName]
                        }

                        return result
                    },
                        api.action.getActionState<any>(meta3dState, initActionName)
                    ),
                    0
                )
            )
        }
    }
}
