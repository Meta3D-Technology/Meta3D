import { setVariables as setVariablesUtils } from "./utils/GlobalUtils";

export let globalKeyNameForMeshInstanceMap: string
export let globalKeyNameForStandardMaterialInstanceMap: string
export let globalKeyNameForTextureInstanceMap: string
export let globalKeyNameForGeometryInstanceMap: string
export let globalKeyNameForDirectionLightInstanceMap: string

export let setVariables = (
    engineSceneProtocolName, globalKeyNameForMeta3dState, globalKeyNameForAPI, globalKeyNameForMeshInstanceMap_, globalKeyNameForStandardMaterialInstanceMap_,

    globalKeyNameForTextureInstanceMap_,
    globalKeyNameForGeometryInstanceMap_,

    globalKeyNameForDirectionLightInstanceMap_
) => {
    setVariablesUtils(
        engineSceneProtocolName, globalKeyNameForMeta3dState, globalKeyNameForAPI, globalKeyNameForMeshInstanceMap_, globalKeyNameForStandardMaterialInstanceMap_,
        globalKeyNameForTextureInstanceMap_,
        globalKeyNameForGeometryInstanceMap_,
        globalKeyNameForDirectionLightInstanceMap_
    )

    globalKeyNameForMeshInstanceMap = globalKeyNameForMeshInstanceMap_
    globalKeyNameForStandardMaterialInstanceMap = globalKeyNameForStandardMaterialInstanceMap_

    globalKeyNameForTextureInstanceMap = globalKeyNameForTextureInstanceMap_

    globalKeyNameForGeometryInstanceMap = globalKeyNameForGeometryInstanceMap_

    globalKeyNameForDirectionLightInstanceMap = globalKeyNameForDirectionLightInstanceMap_
}